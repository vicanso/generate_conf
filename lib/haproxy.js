var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/haproxy.tpl'), 'utf8');
var compiled = _.template(templateStr);

var getAclConfig = function(backends){
  var strList = [];
  _.forEach(backends, function(backend, name){
    var host = backend.host;
    if(host){
      strList.push('#' + name + '的acl配置');
      strList.push('acl ' + name + ' hdr_dom(host) -i ' + host);
      strList.push('use_backend ' + name + ' if node ' + name);
      strList.push('use_backend ' + name + ' if !METH_GET ' + name);
      strList.push('\n');
    }
  });
  strList.push('#默认backend')
  strList.push('default_backend varnish');
  var result = '';
  _.each(strList, function(str){
    result += ('  ' + str + '\n');
  });
  return result;
};

var getBackendConfig = function(backends, varnish){
  var strList = [];
  _.forEach(backends, function(backend, name){
    var balance = backend.balance || 'roundrobin';
    strList.push('backend ' + name);
    strList.push('  #心跳检测');
    strList.push('  option httpchk GET /ping');
    strList.push('  balance ' + balance);
    _.forEach(backend.cluster, function(tmp){
      var weight = tmp.weight || 1;
      strList.push('  server ' + name + ' ' + tmp.host + ':' + tmp.port + ' check inter 5000 rise 3 fall 3 weight ' + weight);
    });
    
  });
  return strList.join('\n');
};


// config.aclConfig = getAclConfig(config.backends);
// config.backendConfig = getBackendConfig(config.backends);

module.exports = function(config){
  var haproxyConfig = config.haproxy;
  haproxyConfig.aclConfig = getAclConfig(config.backends);
  var backends = _.extend({}, config.backends);
  backends.varnish = config.varnish;
  haproxyConfig.backendConfig = getBackendConfig(backends);
  fs.writeFileSync(path.join(config.path, 'haproxy.cfg'), compiled(haproxyConfig));
};


