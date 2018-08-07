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