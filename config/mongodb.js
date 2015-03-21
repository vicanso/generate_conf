module.exports = {
  // mongodb执行文件
  bin : '/usr/local/sbin/mongod',
  // supervisor与docker中显示的名字，以及生成config的名字
  name : 'mongodb',
  // mongodb绑定的端口
  port : 5000,
  // 最大连接数
  maxIncomingConnections : 1000,
  // mongodb log文件
  log : '/vicanso/log/mongodb.log',
  // 多少ms的认为是缓慢的请求处理
  slowOpThresholdMs : 100,
  // 数据存放目录
  dbPath : '/vicanso/data/mongodb',
  docker : {
    // docker的内存限制
    memory : '1g'
  }
};