// varnish服务器的相关系统信息
module.exports = {
  // haproxy的balance方式，参考haproxy文档
  balance : 'uri whole',
  // varnish的执行文件
  bin : '/usr/sbin/varnishd',
  // 生成vcl的名字
  name : 'varnish',
  // 如果有多个varnish，就添加多个
  cluster : [
    {
      // supervisor与docker中显示的名字
      name : 'varnish_3000',
      port : 3000,
      host : '10.169.103.92',
      docker : {
        // docker的内存限制
        memory : '128m'
      }
    }
  ]
};