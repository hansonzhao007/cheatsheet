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




