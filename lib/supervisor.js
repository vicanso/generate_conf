var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('util');
var paths = require('../paths');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/supervisor.tpl'), 'utf8');
var compiled = _.template(templateStr);




module.exports = function(config){

  if(config.mongodb){
    mongodbSupervisor(config.mongodb);
  }

  // console.dir(config);
  // fs.writeFileSync(path.join(config.path, 'mongodb.conf'), compiled(config.mongodb));
};


function mongodbSupervisor(config){
  var configFile = path.join(paths.config, 'mongodb.conf');
  var command = util.format('command=%s -f %s', config.bin, configFile);
  var program = '[program:mongodb]\n' + command;
  var str = compiled({
    program : program
  });
  fs.writeFileSync(path.join(paths.supervisor, 'mongodb.conf'), str);
}