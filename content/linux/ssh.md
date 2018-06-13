# 内网穿透
```bash
# ---------------          ---------------          -------------------
# |  SSH client |==========|  Jump host  |----------|  Target server  |
# ---------------          ---------------          -------------------
#                       WAN IP:129.107.35.245        LAN IP:10.0.0.30
```
## [Transparent Multi-Hop](http://sshmenu.sourceforge.net/articles/transparent-mulithop.html)
[reference](http://sshmenu.sourceforge.net/articles/transparent-mulithop.html)
```bash
# 相当于 SSH client 链接到 Jump host 以后，再从 Jump host ssh 链接到 Target server
# 有多少次跳转就要输入多少次密码
ssh -A -t hanson@129.107.35.245 ssh -A -t hanson@10.0.0.30
```

## ProxyCommand with -W
```bash
# 该方法需要在 Jump host 和 Target server 上的.ssh目录中的 authorized_keys
# -----------------------------------------------------------------
#  1. proxy server configuration
# -----------------------------------------------------------------
Host jump_host
  hostname 129.107.35.245
  user hanson

# -----------------------------------------------------------------
#  2. Set Jump host proxy
# -----------------------------------------------------------------
Host uhead
Host u30
  HostName 10.0.0.30
  ProxyCommand ssh -q -W %h:%p uhead
  user hanson
# 之后直接在 SSH client 上 ssh u30 就可以登录到 Target server 了。
```

## [Local Port Forwarding](https://help.ubuntu.com/community/SSH/OpenSSH/PortForwarding)
```bash
# 该方法需要在 Jump host 上运行下面的 ssh 命令，然后 SSH client 在指定的端口进行
# ssh 链接，才能访问到 Target server. 该方法并不需要添加 public key，只要用户密码

# 1.run command in Jump host:
ssh -2fqnNT -L 129.107.35.245:8888:10.0.0.30:22 <Hostname of Jump host>
#   Then we can see a port forwarding thread:
#   [hanson@uhead ~]$ ss -tnl
#   LISTEN    0   128    129.107.35.245:8888     0.0.0.0:*

# 2.ssh Jump host with specified port in SSH client
ssh xxz1499@129.107.35.245 -p 8888
xxz1499@129.107.35.245 password:

# After login, we are in Target server.
# 该方法的好处是：比如我在 Target server 新建了 N 个学生账户，那么并不需要修改 Host server，
# 在 SSH client 处登录时候，只需要修改相应的 user name 即可。
```

# VPN 代理
## [How to use a SOCKS Proxy 端口转发](http://magicmonster.com/kb/net/ssh/socks_proxy.html)
```bash
# ssh -D <port> <remote host>
# ==================
#  1. 本地机器配置
#  a) 在本地创建 ssh key，然后在 server 端添加该 key。比如 hanson user 的 key
#  b) 在本地设置 ssh 转发 tunnel。下面相当于把对本地 9999 端口的访问转发到了翻墙服务器上
# 
#  -D: Tells SSH that we want a SOCKS tunnel on the specified port number (you can choose a number between 1025-65536)
#  -f: Forks the process to the background
#  -C: Compresses the data before sending it
#  -q: Uses quiet mode
#  -N: Tells SSH that no command will be sent once the tunnel is up
# ==================
ssh -2fqnNT -D 9999 hanson@141.217.24.182

# ==================
#  2. 在 firefox 里面设置 proxy 
#  Manual proxy configuration:
#  SOCKS Host: localhost       Port:9999
# ==================
```