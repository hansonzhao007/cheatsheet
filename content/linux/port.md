# remote port scan
```bash
# signle port 
nc -zv 127.0.0.1 80

# multiple ports
nc -zv 127.0.0.1 22 80 8080

# range of ports
nc -zv 127.0.0.1 22 20-30
```
