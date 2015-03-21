var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('util');
var paths = require('../paths');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/supervisor.tpl'), 'utf8');
var compiled = _.template(templateStr);




module.exports = function(config){

  if(config.haproxy){
    haproxySupervisor(config.haproxy);
  }

  if(config.mongodb){
    mongodbSupervisor(config.mongodb);
  }
  
  if(config.redis){
    redisSupervisor(config.redis);
  }

  if(config.varnish){
    varnishSupervisor(config.varnish);
  }

  // console.dir(config);
  // fs.writeFileSync(path.join(config.path, 'mongodb.conf'), compiled(config.mongodb));
};


function mongodbSupervisor(config){
  var name = config.name;
  var configFile = path.join(paths.config, name + '.conf');
  var command = util.format('command=%s -f %s', config.bin, configFile);
  var program = util.format('[program:%s]\n%s', name, command);
  var str = compiled({
    program : program
  });
  fs.writeFileSync(path.join(paths.supervisor, name + '.conf'), str);
}


function redisSupervisor(config){
  var name = config.name;
  var configFile = path.join(paths.config, name + '.conf');
  var command = util.format('command=%s %s', config.bin, configFile);
  var program = util.format('[program:%s]\n%s', name, command);
  var str = compiled({
    program : program
  });
  fs.writeFileSync(path.join(paths.supervisor, name + '.conf'), str);
}

function varnishSupervisor(config){
  var cluster = config.cluster;
  _.forEach(cluster, function(item){
    var name = item.name;
    var configFile = path.join(paths.config, name + '.vcl');
    var command = util.format('command=%s -f %s -s malloc,%s -a 0.0.0.0:%s -F', config.bin, configFile, item.memory, item.port);
    var program = util.format('[program:%s]\n%s', name, command);
    var str = compiled({
      program : program
    });
    fs.writeFileSync(path.join(paths.supervisor, name + '.conf'), str);
  });
}


function haproxySupervisor(config){
  var name = config.name;
  var configFile = path.join(paths.config, name + '.conf');
  var command = util.format('command=%s -f %s', config.bin, configFile);
  var program = util.format('[program:%s]\n%s', name, command);
  var str = compiled({
    program : program
  });
  fs.writeFileSync(path.join(paths.supervisor, name + '.conf'), str);
}