// 后端服务器，如node server
module.exports = {
  dashboard : {
    host : 'dashboard.vicanso.com',
    // haproxy的balance方式，参考haproxy文档
    balance : 'uri whole',
    cluster : [
      {
        port : 10010,
        host : '10.169.103.92'
      }
    ]
  },
  docs : {
    host : 'docs.vicanso.com',
    // haproxy的balance方式，参考haproxy文档
    balance : 'uri whole',
    cluster : [
      {
        port : 10020,
        host : '10.169.103.92'
      }
    ]
  }
};