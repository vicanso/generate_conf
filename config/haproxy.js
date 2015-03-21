// haproxy的相关配置信息
module.exports = {
  bin : '/usr/local/sbin/haproxy',
  // supervisor与docker中显示的名字，以及生成config的名字
  name : 'haproxy',
  log : {
    host : '10.169.103.92',
    port : 7000,
    name : 'local0'
  },
  port : 80,
  //最大连接数
  maxconn : 4096,
  //进程数量
  nbproc : 1,
  // haproxy的balance方式，参考haproxy文档
  balance : 'roundrobin',
  timeout : {
    //连接超时
    connect : 10000,
    //客户端超时
    client : 30000,
    //服务器超时
    server : 30000,
    //心跳检测超时
    check : 5000
  },
  docker : {
    // docker的内存限制
    memory : '128m'
  }
};
