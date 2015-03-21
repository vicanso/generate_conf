var paths = require('./paths');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var config = require('./config');
_.forEach(paths, function(path){
  mkdirp.sync(path);
});
require('./lib/haproxy')(config);
require('./lib/varnish')(config);
require('./lib/mongodb')(config);
require('./lib/redis')(config);
require('./lib/supervisor')(config);
require('./lib/docker')(config);