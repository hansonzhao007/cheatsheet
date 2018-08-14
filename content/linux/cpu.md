# 查看 CPU cache
```
**[terminal]
**[prompt hanson@u30@20:54:02]**[path ~]**[delimiter  $ ]**[command ls /sys/devices/system/cpu/cpu0/cache/]
index0  index1  index2  index3  power  uevent
**[prompt hanson@u30@20:54:02]**[path ~]**[delimiter  $ ]**[command cat /sys/devices/system/cpu/cpu0/cache/index0/level] 
1  
**[prompt hanson@u30@20:54:02]**[path ~]**[delimiter  $ ]**[command cat  /sys/devices/system/cpu/cpu0/cache/index0/type]  
Data  
**[prompt hanson@u30@20:54:02]**[path ~]**[delimiter  $ ]**[command cat  /sys/devices/system/cpu/cpu0/cache/index0/size]
32K  
```
