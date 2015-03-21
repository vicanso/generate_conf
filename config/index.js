module.exports = {
  haproxy : require('./haproxy'),
  varnish : require('./varnish'),
  backend : require('./backend'),
  mongodb : require('./mongodb'),
  redis : require('./redis'),
  docker : require('./docker')
};