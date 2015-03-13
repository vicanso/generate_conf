var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var paths = require('../paths');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/mongodb.tpl'), 'utf8');
var compiled = _.template(templateStr);


module.exports = function(config){
  fs.writeFileSync(path.join(paths.config, 'mongodb.conf'), compiled(config.mongodb));
};