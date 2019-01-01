# 查看 memory 型号

```bash
sudo lshw -short -C memory
```

# Hugepage 使用

## kernel 准备
为了使用 hugepage，首先 kernel 得支持。在编译 kernel 时候，配置 `CONFIG_HUGETLBFS` 选项。然后在 boot command line 里面，[设置](http://www.cyberciti.biz/tips/10-boot-time-parameters-you-should-know-about-the-linux-kernel.html) `hugepagesz=<size>`.

## 配置可以使用的 huge page 数目

```bash
echo 20 > /proc/sys/vm/nr_hugepages

cat /proc/meminfo | grep Huge
AnonHugePages:         0 kB
ShmemHugePages:        0 kB
HugePages_Total:      20
HugePages_Free:       20
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
Hugetlb:           40960 kB
```

## 在 C++ 里配置 hugepage

参看source code `tools/testing/selftests/vm/hugepage-shm.c`

## Reference
* [hugetlbpage](https://www.kernel.org/doc/Documentation/vm/hugetlbpage.txt)
* [How to force any Linux application to use Hugepages without modifying the source code](https://paolozaino.wordpress.com/2016/10/02/how-to-force-any-linux-application-to-use-hugepages-without-modifying-the-source-code/)
* [How to allocate “huge” pages for C++ application on Linux](https://stackoverflow.com/questions/32652833/how-to-allocate-huge-pages-for-c-application-on-linux)

