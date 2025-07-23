#!/usr/bin/env python3

import queue

if __name__ == '__main__':
    q = queue.Queue()

    q.put({'service_id': 111, 'task_id': 11, 'target_replicas': 1})
    print('1. Queue: {}'.format(q.queue))

    q.put({'service_id': 222, 'task_id': 22, 'target_replicas': 2})
    print('2. Queue: {}'.format(q.queue))

    q.put({'service_id': 333, 'task_id': 33, 'target_replicas': 3})
    print('3. Queue: {}'.format(q.queue), '\n')

    q.get()
    print('A. Queue: {}'.format(q.queue))

    q.get()
    print('B. Queue: {}'.format(q.queue))

    q.get()
    print('C. Queue: {}'.format(q.queue))

