# ctags
安装版本应该是 exuberant ctags

```bash
# 从当前目录递归生成ctag
ctags -R *

# 在vim里设置
set tags=./tags,tags;$HOME # 从当前目录搜索 ctags 文件，直到 home 目录。
```
