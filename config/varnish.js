// varnish服务器的相关系统信息
module.exports = {
  // haproxy的balance方式，参考haproxy文档
  balance : 'uri whole',
  // 如果有多个varnish，就添加多个
  cluster : [
    {
      port : 3000,
      host : 'varnish'
    }
  ]
};