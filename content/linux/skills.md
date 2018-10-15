# rename 重命名
```bash
# 这里使用 cut 命令截取文件名中想要的一段字符，然后再尾部添加 .s 共同构成新的文件名。
for name in *.s
do
    # 取出第 11 到 17 的字符，并和 ".s" 拼接在一起
    newname="$(echo "$name" | cut -c 11-17)".s
    mv "$name"  "$newname"
done
```

使用指定变量名：
```bash
# 从 var 变量名的右边开始匹配，并删除 pattern 匹配的部分
# var: task1.c
# ${var%.c}: 去除 ".c" 后缀
${var%pattern} 
```

# 批量创建用户

```bash
newusers batchuserfile
```

```bash
# batchuserfile
# pw_name:pw_passwd:pw_uid:pw_gid:pw_gecos:pw_dir:pw_shell
phc8166:phc8166::::/stu/phc8166:/bin/bash
tvd6298:tvd6298::::/stu/tvd6298:/bin/bash
sxg8183:sxg8183::::/stu/sxg8183:/bin/bash
rxs9961:rxs9961::::/stu/rxs9961:/bin/bash
axs7268:axs7268::::/stu/axs7268:/bin/bash
kxt4593:kxt4593::::/stu/kxt4593:/bin/bash
safal:safal::::/stu/safal:/bin/bash
```

# Batch grading
```
test=("Saving correctly!" "file1.txt file2.txt merged_file.txt" "append.txt 2 line1 line2")
i=0
for src in *.c; do
    printf "************ task $((i + 2)) ************\n"
    gcc -w $src
    ./a.out <<< ${test[$i]}
    i=$((i + 1))
    printf "\n"
done;
```

# 批量 grade homework
```bash
test=("2 a 100 b 90" "3 1 2 3" "3 4 5 6" "5 1 2 3 4 5" " 4 1 2 3 4 3")
i=0
for src in *.c; do
    printf "************ task $((i + 2)) ************\n"
    gcc -w $src
    ./a.out <<< ${test[$i]}
    i=$((i + 1))
    printf "\n"
done;
```

# DD 命令创建U盘启动盘

`diskutil list`: 输出挂载 U 盘信息
`diskutil umountDisk disk4`: 卸载U盘

使用dd命令将下载的Ubuntu Linux镜像恢复到U盘上。一定注意不要把磁盘写错了。不然哭死。

```bash: 
sudo dd if=/Users/sky/Downloads/ISO/ubuntu-17.10-desktop-amd64.iso of=/dev/disk4 bs=50m

# mac
brew install coreutils
sudo gdd if=Downloads/archlinux-2018.10.01-x86_64\(1\).iso of=/dev/disk2 status=progress
```

完整的输出信息：
```bash
~ % diskutil umountDisk disk4
Unmount of all volumes on disk4 was successful
~ % sudo dd if=/Users/sky/Downloads/ISO/ubuntu-17.10-desktop-amd64.iso of=/dev/disk4 status="progress"
Password:
1431+1 records in
1431+1 records out
1501102080 bytes transferred in 906.101477 secs (1656660 bytes/sec)
```

# Compile kernel

## prepare

```bash
sudo apt update
sudo apt install bison flex
sudo apt install build-essential
sudo apt install libncurses5-dev
sudo apt install fakeroot libssl-dev
sudo apt install libelf-dev

# go to linux source folder
# copy config file to current folder
cp /boot/config-$(uname -r) .config   
make menuconfig # 打开可视化菜单
# 选择 load→OK→Save→OK→EXIT→EXIT
```

## compile
```bash
# compile iso
sudo make -j32

# compile modules
make modules -j32

# install modules
make modules_install

# install kernel
make install
```

## change bootloader
```bash
sudo update-grub
```



