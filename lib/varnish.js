var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var util = require('util');
var paths = require('../paths');
var templateStr = fs.readFileSync(path.join(__dirname, '../template/varnish.tpl'), 'utf8');

var getBackendTemplateStr = function(str){
  var startStr = '# backend start\n';
  var start = str.indexOf(startStr) + startStr.length;
  var end = str.indexOf('# backend end');
  return str.substring(start, end);
};

var backendTemplateStr = getBackendTemplateStr(templateStr);
templateStr = templateStr.replace(backendTemplateStr, '<%= backendConfig %>');

var getBackendConfig = function(backends){
  var arr = [];
  var compiled = _.template(backendTemplateStr);
  _.forEach(backends, function(backend, name){
    _.forEach(backend.cluster, function(tmp, i){
      tmp = _.extend({
        name : name + i
      }, tmp);
      arr.push(compiled(tmp));
    });
  });
  return arr.join('\n');
};


var getInitConfig = function(backends){
  var arr = [];
  _.forEach(backends, function(backend, name){
    arr.push(util.format('new %s = directors.round_robin();', name));
    _.forEach(backend.cluster, function(tmp, i){
      arr.push(util.format('%s.add_backend(%s);', name, name + i));
    });
  });
  _.forEach(arr, function(tmp, i){
    arr[i] = '  ' + tmp;
  });
  return arr.join('\n');
};


var getBackendSelectConfig = function(backends){
  var index = 0;
  var arr = [];
  _.forEach(backends, function(backend, name){
    if(index === 0){
      arr.push(util.format('  if(req.http.host == "%s"){\n', backend.host));
      
    }else{
      arr.push(util.format('  }elsif(req.http.host == "%s"){\n', backend.host));
    }
    arr.push(util.format('    set req.backend_hint = %s.backend();\n', name));
    index++;
  });
  arr.push('  }\n');
  return arr.join('');
};


module.exports = function(config){
  var backendConfig = getBackendConfig(config.backend);
  var initConfig = getInitConfig(config.backend);
  var backendSelectConfig = getBackendSelectConfig(config.backend);
  var compiled = _.template(templateStr);
  var varnishConfig = {
    backendConfig : backendConfig,
    initConfig : initConfig,
    backendSelectConfig : backendSelectConfig
  };
  fs.writeFileSync(path.join(paths.config, 'varnish.vcl'), compiled(varnishConfig));
};
