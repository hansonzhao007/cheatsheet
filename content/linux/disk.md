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