---
title: "Linux 命令行技巧分享"
date: "2024-01-10"
description: "分享一些实用的 Linux 命令行技巧，让你的工作效率翻倍"
tags: ["linux", "terminal", "shell", "productivity"]
---

# Linux 命令行技巧分享

作为一名开发者，掌握 Linux 命令行是必不可少的技能。今天分享一些我常用的技巧。

## 文件操作技巧

### 快速查找文件

```bash
# 按名称查找文件
find . -name "*.js" -type f

# 按内容查找文件
grep -r "function" . --include="*.js"

# 使用 fd (更快的 find 替代品)
fd "\.js$" . --type f
```

### 批量操作

```bash
# 批量重命名
for file in *.txt; do
  mv "$file" "${file%.txt}.bak"
done

# 批量压缩图片
for img in *.jpg; do
  convert "$img" -quality 80 "compressed_$img"
done
```

## 进程管理

### 查看进程

```bash
# 查看进程树
ps aux --forest

# 实时监控进程
htop

# 查找占用端口的进程
lsof -i :3000
netstat -tulpn | grep :3000
```

### 后台任务

```bash
# 运行后台任务
nohup python script.py > output.log 2>&1 &

# 查看后台任务
jobs -l

# 恢复后台任务到前台
fg %1
```

## 网络工具

### 网络诊断

```bash
# 测试连接
ping -c 4 google.com

# 查看网络路由
traceroute google.com

# 测试端口
telnet localhost 3000
nc -zv localhost 3000
```

### 文件传输

```bash
# SCP 传输文件
scp file.txt user@server:/path/to/destination/

# rsync 同步目录
rsync -avz --progress source/ user@server:destination/

# 使用 curl 下载
curl -O https://example.com/file.zip
curl -L https://example.com/redirect -o file.zip
```

## 文本处理

### 强大的文本工具

```bash
# 统计行数、单词数、字符数
wc -l file.txt

# 排序和去重
sort file.txt | uniq

# 提取特定列
awk '{print $1, $3}' file.txt

# 替换文本
sed 's/old/new/g' file.txt
```

### 日志分析

```bash
# 查看实时日志
tail -f /var/log/nginx/access.log

# 统计访问量
awk '{print $1}' access.log | sort | uniq -c | sort -nr

# 查找错误日志
grep -i error /var/log/nginx/error.log | tail -20
```

## 系统监控

### 性能监控

```bash
# 查看磁盘使用
df -h
du -sh * | sort -hr

# 查看内存使用
free -h
cat /proc/meminfo

# 查看系统负载
uptime
w
```

### 系统信息

```bash
# 查看系统信息
uname -a
lsb_release -a

# 查看硬件信息
lscpu
lsblk
lsusb
```

## 实用别名

在 `~/.bashrc` 或 `~/.zshrc` 中添加：

```bash
# 常用别名
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# Git 别名
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'

# 系统监控别名
alias ports='netstat -tulanp'
alias meminfo='free -m -l -t'
alias psmem='ps auxf | sort -nr -k 4'
alias pscpu='ps auxf | sort -nr -k 3'

# 网络别名
alias ping='ping -c 5'
alias fastping='ping -c 100 -s.2'
```

## 高级技巧

### 命令组合

```bash
# 管道组合
ps aux | grep nginx | grep -v grep | awk '{print $2}' | xargs kill

# 命令替换
echo "今天是 $(date +%Y-%m-%d)"

# 条件执行
make && make install || echo "构建失败"
```

### 快捷键

```bash
# 常用快捷键
Ctrl+A  # 行首
Ctrl+E  # 行尾
Ctrl+U  # 删除到行首
Ctrl+K  # 删除到行尾
Ctrl+R  # 搜索历史命令
Ctrl+L  # 清屏
```

## 总结

掌握这些 Linux 命令行技巧能大大提高工作效率：

1. **文件操作**: 快速查找、批量处理
2. **进程管理**: 监控和控制系统进程
3. **网络工具**: 诊断和传输
4. **文本处理**: 分析和处理数据
5. **系统监控**: 了解系统状态

记住，熟能生巧。多练习这些命令，它们会成为你的得力助手！

---

*命令行是程序员最好的朋友之一，希望这些技巧对你有帮助！*