## [Transparent Multi-Hop](http://sshmenu.sourceforge.net/articles/transparent-mulithop.html)
```bash
ssh host1 -A -t host2 -A -t host3 ...
```

## [How to use a SOCKS Proxy](http://magicmonster.com/kb/net/ssh/socks_proxy.html)
```bash
# ssh -D <port> <remote host>
# ==================
#  1. 本地机器配置
#  a) 在本地创建 ssh key，然后在 server 端添加该 key。比如 hanson user 的 key
#  b) 在本地设置 ssh 转发 tunnel
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