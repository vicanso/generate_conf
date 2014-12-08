var config = require('./config');
require('./lib/haproxy')(config);
require('./lib/varnish')(config);