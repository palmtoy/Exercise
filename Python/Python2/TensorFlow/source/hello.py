#-*- coding: utf-8 -*-

# Just disables the warning, doesn't enable AVX/FMA
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import tensorflow as tf

sess = tf.Session()

hello = tf.constant('Hello, TensorFlow!')
print(sess.run(hello))
###################################################

a = tf.constant(1)
b = tf.constant(2)
print('a + b = ' + str(sess.run(a + b)))
print
###################################################

# 创建一个整型常量，即 0 阶 Tensor
t0 = tf.constant(3, dtype=tf.int32)

# 创建一个浮点数的一维数组，即 1 阶 Tensor
t1 = tf.constant([3., 4.1, 5.2], dtype=tf.float32)

# 创建一个字符串的2x2数组，即 2 阶 Tensor
t2 = tf.constant([['Apple', 'Orange'], ['Potato', 'Tomato']], dtype=tf.string)

# 创建一个 2x3x1 数组，即 3 阶张量，数据类型默认为整型
t3 = tf.constant([[[5], [6], [7]], [[4], [3], [2]]])

# 打印上面创建的几个 Tensor
print(t0) # Tensor("Const_3:0", shape=(), dtype=int32)
print(t1) # Tensor("Const_4:0", shape=(3,), dtype=float32)
print(t2) # Tensor("Const_5:0", shape=(2, 2), dtype=string)
print(t3) # Tensor("Const_6:0", shape=(2, 3, 1), dtype=int32)
print

print('t0 = ' + str(sess.run(t0)))
print('t1 = ' + str(sess.run(t1)))
print('t2 = ' + str(sess.run(t2)))
print('t3 = ' + str(sess.run(t3)))
print
###################################################

# 创建两个常量节点
node1 = tf.constant(3.2)
node2 = tf.constant(4.8)
# 创建一个 adder 节点，对上面两个节点执行 + 操作
adder = node1 + node2
# 打印一下 adder 节点
print(adder) # Tensor("add_1:0", shape=(), dtype=float32)
# 打印 adder 运行后的结果
print('adder = ' + str(sess.run(adder)))
print
###################################################

# 创建两个占位 Tensor 节点
a = tf.placeholder(tf.float32)
b = tf.placeholder(tf.float32)
# 创建一个 adder_node 节点，对上面两个节点执行 + 操作
adder_node = a + b
# 打印三个节点
print(a)
print(b)
print(adder_node)
# 运行一下, 后面的 dict 参数是为占位 Tensor 提供输入数据
print('adder_node = ' + str(sess.run(adder_node, {a: 3, b: 4.5})))
print('adder_node = ' + str(sess.run(adder_node, {a: [1, 3], b: [2, 4]})))
# 添加×操作
add_and_triple = adder_node * 3.
print('add_and_triple = ' + str(sess.run(add_and_triple, {a: 3, b: 4.5})))

print
###################################################

sess.close()
