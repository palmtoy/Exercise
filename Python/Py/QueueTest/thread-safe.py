#!/usr/bin/env python3

import queue
import threading
import time
from datetime import datetime, timedelta, timezone

q = queue.Queue()

def producer():
    task_id = 1
    while True:
        item = {
            'task_id': task_id,
            'service_id': task_id * 10,
            'target_replicas': task_id * 100,
        }
        q.put(item)
        now = datetime.now(timezone(timedelta(hours=8)))
        ts = now.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        print(f'{ts} [ !! Producer !! ] Put: {item}; Queue size: {q.qsize()}')
        # 打印当前队列内容, 使用 with q.mutex 来保证线程安全
        with q.mutex:
            print(f'{ts} [ !! Producer !! ] Queue content: {list(q.queue)}\n')
        task_id += 1
        time.sleep(2)

def consumer():
    while True:
        item = q.get()
        now = datetime.now(timezone(timedelta(hours=8)))
        ts = now.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]
        print(f'{ts} [    Consumer    ] Got: {item}; Queue size: {q.qsize()}')
        # 打印当前队列内容, 使用 with q.mutex 来保证线程安全
        with q.mutex:
            print(f'{ts} [    Consumer    ] Queue content: {list(q.queue)}\n')
        q.task_done()
        time.sleep(3)

if __name__ == '__main__':
    t_producer = threading.Thread(target=producer, daemon=True)
    t_consumer = threading.Thread(target=consumer, daemon=True)
    t_producer.start()
    t_consumer.start()
    # 主线程保持运行
    while True:
        time.sleep(1)

