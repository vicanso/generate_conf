// docker相关配置信息
module.exports = {
  // docker的执行文件
  bin : '/usr/bin/docker',
  mount : '/vicanso',
  image : 'vicanso/jenny',
  supervisord : '/usr/local/bin/supervisord'
};