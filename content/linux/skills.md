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
