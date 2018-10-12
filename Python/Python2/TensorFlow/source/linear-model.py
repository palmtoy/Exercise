#-*- coding: utf-8 -*-

# Just disables the warning, doesn't enable AVX/FMA
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import tensorflow as tf

sess = tf.Session()

# 创建变量 W 和 b 节点，并设置初始值
W = tf.Variable([.1], dtype = tf.float32)
b = tf.Variable([-.1], dtype = tf.float32)
# 创建 x 节点，用来输入实验中的输入数据
x = tf.placeholder(tf.float32)
# 创建线性模型
linear_model = W * x + b

# 创建 y 节点，用来输入实验中得到的输出数据，用于损失模型计算
y = tf.placeholder(tf.float32)
# 创建损失模型
loss = tf.reduce_sum(tf.square(linear_model - y))

# 初始化变量
init = tf.global_variables_initializer()
sess.run(init)

print('linear_model: %s' % (sess.run(linear_model, {x: [1, 2, 3, 6, 8]})))
print('loss-a: %s' % (sess.run(loss, {x: [1, 2, 3, 6, 8], y: [4.8, 8.5, 10.4, 21.0, 25.3]})))
print
###################################################

# 给 W 和 b 赋新值
fixW = tf.assign(W, [2.])
fixb = tf.assign(b, [1.])
# run 之后新值才会生效
sess.run([fixW, fixb])
# 重新验证损失值
print('loss-b: %s' % (sess.run(loss, {x: [1, 2, 3, 6, 8], y: [4.8, 8.5, 10.4, 21.0, 25.3]})))
print
###################################################

# 创建一个梯度下降优化器，学习率为0.001
optimizer = tf.train.GradientDescentOptimizer(0.001)
train = optimizer.minimize(loss)

# 用两个数组保存训练数据
x_train = [1, 2, 3, 6, 8]
y_train = [4.8, 8.5, 10.4, 21.0, 25.3]

# 训练1k次
for i in range(1000):
    sess.run(train, {x: x_train, y: y_train})

# 打印一下训练后的结果
print('x_train: %s, y_train: %s' % (x_train , y_train))
print('W: %s, b: %s, loss-c: %s' % (sess.run(W), sess.run(b), sess.run(loss, {x: x_train , y: y_train})))
###################################################

sess.close()
