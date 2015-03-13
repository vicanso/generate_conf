module.exports = {
  bin : '/usr/local/sbin/mongod',
  // mongodb绑定的端口
  port : 5000,
  // 最大连接数
  maxIncomingConnections : 1000,
  // mongodb log文件
  log : '/vicanso/log/mongodb.log',
  // 多少ms的认为是缓慢的请求处理
  slowOpThresholdMs : 100,
  // 数据存放目录
  dbPath : '/vicanso/data/mongodb'
};