###全局配置信息###
###参数是进程级的，通常和操作系统（OS）相关###
global
  log <%= log.host %>:<%= log.port %> <%= log.name %> #[err warning info debug]
  maxconn <%= maxconn%>  #最大连接数
  #chroot /usr/local/sbin/haproxy  #chroot运行的路径
  #daemon   #以后台形式运行haproxy
  nbproc <%= nbproc %>  #进程数量(可以设置多个进程提高性能)
  # log-send-hostname  #log中带上服务器的hostname
  log-tag [HAPROXY]
  
###默认全局配置信息###
###这些参数可以被利用配置到frontend，backend，listen组件###
defaults
  log global
  mode http
  option httplog
  option dontlognull  #不记录健康检查的日志信息
  option forwardfor #如果后端服务器需要获得客户端真实ip需要配置的参数，可以从Http Header中获得客户端ip
  option http-server-close #client--长连接--haproxy--短连接--webserver
  option abortonclose   #当服务器负载很高的时候，自动结束掉当前队列处理比较久的连接
  retries 3  #3次连接失败就认为服务不可用，也可以通过后面设置
  balance <%= balance %>    #默认的负载均衡的方式,轮询方式
  timeout connect <%= timeout.connect %>                 #连接超时 
  timeout client <%= timeout.client %>                #客户端超时 
  timeout server <%= timeout.server %>                #服务器超时 
  timeout check <%= timeout.check %>              #心跳检测超时


###frontend配置###
###注意，frontend配置里面可以定义多个acl进行匹配操作###

frontend 80port
  bind 0.0.0.0:80 

  # log the name of the virtual server
  capture request header Host len 20
  # log the beginning of the referrer
  capture request header Referer len 100
  # log the User-Agent
  capture request header User-Agent len 100
  
  # log uuid cookie
  capture cookie vicanso len 44



  

  ###acl策略配置###

  #不可缓存的http请求#
  acl node url_end ?cache=false
  acl node url_end &cache=false

<%= aclConfig %>


###backend的设置###
<%= backendConfig %>