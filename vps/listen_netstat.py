#!/usr/bin/python
# coding=utf-8
# author=youngwind
import os
import sys
import time
from datetime import datetime


def listen():
    '''
    监听所有到主机的连接
    '''

    all_ = 'listen_all.txt'
    process = 'listen_process.txt'
    ip = 'listen_ip.txt'
    while 1:
        with open('/tmp/%s' % all_, 'a') as f:
            f.write('\n\n{0}:\n\n'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S %f %p')))
        os.system("netstat -a >> /tmp/%s" % all_)

        with open('/tmp/%s' % process, 'a') as f:
            f.write('\n\n{0}:\n\n'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S %f %p')))
        os.system("netstat -p >> /tmp/%s" % process)

        with open('/tmp/%s' % ip, 'a') as f:
            f.write('\n\n{0}:\n\n'.format(datetime.now().strftime('%Y-%m-%d %H:%M:%S %f %p')))
        os.system("netstat -pnt | awk '/^tcp/{print $5}' | cut -d: -f 1 | sort -n |uniq -c >> /tmp/%s" % ip)

        time.sleep(1200)    # 20分钟一次


if __name__ == '__main__':
    if len(sys.argv) == 1:
        print 'Enter example: python listen_netstat.py [start or stop]'
    if sys.argv[1] == 'start':
        listen()
    elif sys.argv[1] == 'stop':
        os.system("killall -9 listen_netstat.py")
    else:
        print 'Enter example: python listen_netstat.py [start or stop]'


