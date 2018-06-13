
![](/img/inode.png)

```bash
`ls -i`：显示文件的inode

`stat filename`：显示文件的所有状态信息，包括大小，inode id，link 数目，创建时间，修改时间等
```

如果有一个文件名很奇怪，无法使用正常的 rm 命令删除，比如：“ab*  

那么可以使用 `find . -inum xxxx -delete` 命令删除    

`ln file1 filelink1`：给file1创建一个名字叫做filelink1的hard link，具有相同的 inode id。加上参数 -s 则创建 softlink
```bash
mac@macs-MacBook  ~/Code/coding/S2/S2   master ●  ls -i
4304576742 main.cpp
mac@macs-MacBook  ~/Code/coding/S2/S2   master ●  ln main.cpp t.c
mac@macs-MacBook  ~/Code/coding/S2/S2   master ●  ls -i
4304576742 main.cpp 4304576742 t.c
mac@macs-MacBook  ~/Code/coding/S2/S2   master ● 
```

`df -i`：查看磁盘inode资源的使用情况

