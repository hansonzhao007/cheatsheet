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
