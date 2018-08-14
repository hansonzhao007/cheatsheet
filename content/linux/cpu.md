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

```bash
sudo lshw -C memory 打印所有 cache 信息
lscpu 列出 CPU 信息
getconf -a 列出所有系统配置信息（包括 cache line size 信息）
x86info -c：display x86 CPU diagnostics
lstopo: 可视化 cache 信息
sudo dmidecode -t cache: 打印出包括 cache 类型的所有信息
关于 /sys/devices/system/cpu/cpu0/cache/index*的[解释](https://patchwork.kernel.org/patch/5003041/)
cat /proc/cpuinfo: 打印 CPU 信息
cpuid: 打印出所有的 CPU 信息，特别全(cache TLB ...)
```