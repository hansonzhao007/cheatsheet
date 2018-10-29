# remote port scan
```bash
# signle port 
nc -zv 127.0.0.1 80

# multiple ports
nc -zv 127.0.0.1 22 80 8080

# range of ports
nc -zv 127.0.0.1 22 20-30
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