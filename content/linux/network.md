# remote port scan
```bash
# signle port 
nc -zv 127.0.0.1 80

# multiple ports
nc -zv 127.0.0.1 22 80 8080

# range of ports
nc -zv 127.0.0.1 22 20-30
```
# iptables SNAT sharing Internet

```bash
# save this as config.sh
sysctl -w net.ipv4.ip_forward=1
sysctl -p

iptables -X
iptables -t nat -X

iptables -F
iptables -t nat -F

iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eno2 -j SNAT --to-source 129.107.208.76
```


# ip scan
```bash
nmap -sP 10.0.0.*
```

# dhcp
```bash
hanson@u41@11:52:06:/etc/netctl ls
eno1  examples  hooks  interfaces
hanson@u41@11:52:07:/etc/netctl cat eno1
Description='A basic dhcp ethernet connection'
Interface=eno1
Connection=ethernet
IP=dhcp
#Address=('129.107.116.236/23')
#Gateway='129.107.116.1'
#DNS=('129.107.35.89')
#IP6=no
#DHCPClient=dhcpcd
#DHCPReleaseOnStop=no
## for DHCPv6
#IP6=dhcp
#DHCP6Client=dhclient
## for IPv6 autoconfiguration
#IP6=stateless

systemctl restart dhcpcd.service
```

```bash
# 做 mac 到 ip 的映射
sudo vim /etc/dhcp/dhcpd.conf

# 设置 192.168.0.* 对应的域名
sudo vim /etc/bind/zones/db.192.168.0

# 绑定 seir* 对应的 ip 解析 
sudo vim /etc/bind/zones/uta.edu.db

# 重启 dhcp 服务
sudo /etc/init.d/isc-dhcp-server restart

# 显示分配 ip 状态
sudo /etc/init.d/isc-dhcp-server status
```