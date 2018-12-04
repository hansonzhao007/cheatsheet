# 创建 local git server

## 在 server 上创建名为 git 的用户

```bash
useradd -m git
su git
cd
mkdir .ssh && chmod 700 .ssh
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_key
```

然后将你自己的电脑的 public key 复制到 `authorized_key` 里面。

## 创建一个空的仓库

```bash
cd
mkdir yourprojectname.git
cd yourprojectname.git
git init --bare
Initialized empty Git repository in /home/git/yourprojectname.git/
```

## 连接本地 project

```bash
$ cd myproject
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin git@gitserver:/home/git/yourprojectname.git
$ git push origin master
```