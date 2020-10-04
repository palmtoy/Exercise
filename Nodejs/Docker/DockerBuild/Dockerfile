# 使用官方提供的Node.js开发镜像作为基础镜像
FROM node:10.14.2

# 将工作目录切换为 /root
WORKDIR /root

# 将当前目录下的所有内容复制到 /root 下
ADD . /root

# 允许外界访问容器的 3000 端口
EXPOSE 3000

# 设置容器进程为：node app.js，即：这个Node.js应用的启动命令
CMD ["node", "app.js"]

