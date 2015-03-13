
module.exports = {
  // log文件
  log : '/vicanso/log/redis.log',
  // 数据存放目录
  dbPath : '/vicanso/data/redis',
  password : process.env.REDIS_PWD || 'MY_REDIS_PWD'
};
