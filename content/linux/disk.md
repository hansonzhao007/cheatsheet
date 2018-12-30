# 格式化磁盘
```bash
sudo mkfs.ext3 /dev/sda6 把该设备格式化成ext3文件系统
sudo mke2fs -j /dev/sda6 把该设备格式化成ext3文件系统。  
sudo mkfs.ext2 /dev/sda6 把该设备格式化成ext2文件系统。  
sudo mke2fs /dev/sda6 把该设备格式化成ext2文件系统。  
sudo mkfs.reiserfs /dev/sda6 把该设备格式化成reiserfs文件系统。  
sudo mkfs.vfat /dev/sda6 把该设备格式化成fat32文件系统。  
sudo mkfs.msdos /dev/sda6 把该设备格式化成fat16文件系统,msdos文件系统就是fat16。  
sudo mkdosfs /dev/sda6 把该设备格式化成fat16文件系统，同mkfs.msdos  
sudo mkswap /dev/sda6 把该设备格式化成swap文件系统
```

# Disk Command

```bash
df -Th # 显示磁盘挂在目录，以及文件系统
lsblk  # displays block devices
fdisk -l # 显示磁盘物理状态
```

# 挂载
```bash
mount：直接输出所有的盘符挂载情况
mount [-t type] device dir: 将device挂载到目录dir上。如果dir是已经存在的有内容的目录，那么新挂载的盘会暂时替换原有的内容，这时候只需要使用命令 umount卸载disk即可。
```


# fio

[fio documentation](https://fio.readthedocs.io/en/latest/fio_doc.html)

[Storage Performance Benchmarking with fio](https://thesanguy.com/2018/01/24/storage-performance-benchmarking-with-fio/)

# mount tmpfs

```bash
cd 
mkdir tmp
# 在自己的home 目录下创建一个 mount 到RAM 的 tmp folder
sudo mount tmpfs ~/tmp/ -t tmpfs

# umount
sudo umount ~/tmp
```

# 关闭 ext4 journal

```bash
# 格式化磁盘 
hanson@u41@14:51:22:~ sudo mkfs.ext4 /dev/nvme0n1
mke2fs 1.44.1 (24-Mar-2018)
Discarding device blocks: done
Creating filesystem with 293028246 4k blocks and 73261056 inodes
Filesystem UUID: 03727098-d292-4bb3-8d4c-c5ad157ec54e
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
	4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968,
	102400000, 214990848
...

# 查看是否开启日志
hanson@u41@14:53:52:~ sudo dumpe2fs /dev/nvme0n1 | grep 'Filesystem features' | grep 'has_journal'
dumpe2fs 1.44.1 (24-Mar-2018)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype extent 64bit flex_bg sparse_super large_file huge_file dir_nlink extra_isize metadata_csum

# 关闭日志
hanson@u41@14:53:52:~ sudo tune2fs -O ^has_journal /dev/nvme0n1
tune2fs 1.44.1 (24-Mar-2018)

# 开启日志
hanson@u41@14:53:52:~ sudo tune2fs -O has_journal /dev/nvme0n1
```

# IO 监控

参看 [Linux下的IO监控与分析](https://www.cnblogs.com/quixotic/p/3258730.html)

![IO](/img/IO.png)

## 系统 IO 监控

```bash
iostat -xdm 1
```
* `%util`:代表磁盘繁忙程度。100% 表示磁盘繁忙, 0%表示磁盘空闲。但是注意,磁盘繁忙不代表磁盘(带宽)利用率高  
* `argrq-sz`:提交给驱动层的IO请求大小,一般不小于4K,不大于max(readahead_kb, max_sectors_kb). 可用于判断当前的IO模式,一般情况下,尤其是磁盘繁忙时, 越大代表顺序,越小代表随机
* `svctm`: 一次IO请求的服务时间,对于单块盘,完全随机读时,基本在7ms左右,既寻道+旋转延迟时间

### 注: 各统计量之间关系

```bash
=======================================

%util = ( r/s  +  w/s) * svctm / 1000             # 队列长度 =  到达率 * 平均服务时间
avgrq-sz = ( rMB/s + wMB/s) * 2048 / (r/s  + w/s) # 2048 为 1M / 512

=======================================
```

### 总结:

iostat 统计的是通用块层经过合并(rrqm/s, wrqm/s)后,直接向设备提交的IO数据,可以反映系统整体的IO状况,但是有以下2个缺点:
1.  距离业务层比较遥远,跟代码中的write,read不对应(由于系统预读 + pagecache + IO调度算法等因素, 也很难对应)
2.  是系统级,没办法精确到进程,比如只能告诉你现在磁盘很忙,但是没办法告诉你是谁在忙,在忙什么？

## 进程 IO

1. `iotop`    顾名思义, io版的top
2. `pidstat` 顾名思义, 统计进程(pid)的stat,进程的stat自然包括进程的IO状况

这两个命令,都可以按进程统计IO状况,因此可以回答你以下二个问题

* 当前系统哪些进程在占用IO,百分比是多少?
* 占用IO的进程是在读?还是在写?读写量是多少?

pidstat 参数很多,仅给出几个个人习惯

```bash
pidstat -d  1           #只显示IO

pidstat -u -r -d -t 1   # -d IO 信息,
						# -r 缺页及内存信息
						# -u CPU使用率
						# -t 以线程为统计单位
						# 1  1秒统计一次
```
