
module.exports = {
  bin : '/usr/local/bin/redis-server',
  // supervisor与docker中显示的名字，以及生成config的名字
  name : 'redis',
  // 绑定端口
  port : 4000,
  // log文件
  log : '/vicanso/log/redis.log',
  // 数据存放目录
  dbPath : '/vicanso/data/redis',
  password : process.env.REDIS_PWD || 'MY_REDIS_PWD',
  docker : {
    // docker的内存限制
    memory : '256m'
  }
};
