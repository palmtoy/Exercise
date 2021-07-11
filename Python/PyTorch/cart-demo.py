import gym

env = gym.make('CartPole-v1')

print('State shape:', env.observation_space.shape)
print('Number of actions:', env.action_space.n)

for _ in range(20):
    observation = env.reset()  # 初始状态
    for t in range(500):
        env.render()  # 显示图像
        action = env.action_space.sample()  # 随机选择一个动作
        observation, reward, done, info = env.step(action)  # 状态, 回报, 是否结束, 信息
        print(observation, reward, done, info)
        if done:
            print('Episode finished after {} timesteps'.format(t + 1))
            break

env.close()

