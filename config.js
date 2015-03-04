module.exports = {
  path : '/vicanso/config',
  haproxy : {
    log : {
      host : '10.169.103.92',
      port : 7000,
      name : 'local0'
    },
    //最大连接数
    maxconn : 4096,
    //进程数量
    nbproc : 1,
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
    }
  },
  varnish : {
    balance : 'uri whole',
    cluster : [
      {
        port : 3000,
        host : 'varnish'
      }
    ]
  },
  backends : {
    dashboard : {
      host : 'dashboard.vicanso.com',
      balance : 'uri whole',
      cluster : [
        {
          port : 10010,
          host : 'dashboard'
        }
      ]
    },
    docs : {
      host : 'docs.vicanso.com',
      balance : 'uri whole',
      cluster : [
        {
          port : 10020,
          host : 'docs'
        }
      ]
    }
  }
}