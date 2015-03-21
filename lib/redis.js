var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var paths = require('../paths');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/redis.tpl'), 'utf8');
var compiled = _.template(templateStr);


module.exports = function(config){
  var redisConfig = config.redis;
  fs.writeFileSync(path.join(paths.config, redisConfig.name + '.conf'), compiled(redisConfig));
};