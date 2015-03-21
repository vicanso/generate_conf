var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var paths = require('../paths');

module.exports = function(config){
  var commandList = [];

  if(config.haproxy){
    commandList.push(getDockerCommand(config.docker, config.haproxy));
  }

  if(config.varnish){
    _.forEach(config.varnish.cluster, function(item){
      commandList.push(getDockerCommand(config.docker, item));
    });
  }

  if(config.mongodb){
    commandList.push(getDockerCommand(config.docker, config.mongodb));
  }

  if(config.redis){
    commandList.push(getDockerCommand(config.docker, config.redis));
  }
  var allCmd = [];
  _.forEach(commandList, function(commnad){
    var str = commnad.cmd;
    fs.writeFileSync(path.join(paths.docker, commnad.name + '.sh'), str);
    allCmd.push(str);
  });
  fs.writeFileSync(path.join(paths.docker, 'all.sh'), allCmd.join('\n'));
};


function getDockerCommand(dockerConfig, config){
  var name = config.name;
  var arr = [dockerConfig.bin];
  arr.push('run', '-d');

  if(dockerConfig.mount){
    var mount = dockerConfig.mount;
    if(mount.indexOf(':') === -1){
      mount = mount + ':' + mount;
    }
    arr.push('-v', mount);
  }

  arr.push('--name="' + name + '"');

  if(config.docker){
    if(config.docker.memory){
      arr.push('-m', config.docker.memory);
    }
  }

  if(config.port){
    arr.push('-p', config.port + ':' + config.port);
  }

  arr.push(dockerConfig.image);

  var configFile = path.join(paths.supervisor, name + '.conf');

  arr.push(dockerConfig.supervisord, '-c', configFile);

  return {
    cmd : arr.join(' '),
    name : name
  };
}
