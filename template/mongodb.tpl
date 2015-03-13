net :
  # mongodb绑定的端口
  port : <%= port %> 
  # 最大连接数
  maxIncomingConnections : <%= maxIncomingConnections %>

systemLog :
  syslogFacility : user
  logAppend : true
  path : <%= log %>
  destination : file

operationProfiling :
  # 多少ms的认为是缓慢的请求处理
  slowOpThresholdMs : <%= slowOpThresholdMs %>
  # 显示slow的操作log
  mode : slowOp

storage :
  dbPath : <%= dbPath %>
  directoryPerDB : true
