# coding=utf-8
import datetime
import os
import re

import requests
from requests_futures.sessions import FuturesSession

main_url = 'http://www.fqxsw.com/book/wanmeishijie/'
url_prefix = 'http://www.fqxsw.com'
zhangjie_list_regex = r'<span><a href="(/\w+/\d+/\d+.html)">'
content_regex = r'<div id="booktext">(.*?)</div>'
title_regex = r'<dt>(.*?)</dt>'
dir_path_regex = r'<title>(.*?)</title>'
title_suffix = '.txt'

path = None  # 文件夹路径
session = FuturesSession(max_workers=5)  # 初始化异步线程池大小
title_none_num = 0
text_none_num = 0


def timekeeping(func):

    def wrapper(*args, **kwargs):
        time = datetime.datetime.now()
        func(*args, **kwargs)
        print '--------------用时', datetime.datetime.now() - time, '---------------'

    return wrapper


@timekeeping
def run():
    html = requests.get(main_url)
    dir_path_name = re.findall(dir_path_regex, html.text)
    dir_path_name = dir_path_name[0].encode('latin-1').decode('gbk').split(',')[0]
    global path
    path = mark_dir_path(dir_path_name)
    zhangjie_list = re.findall(zhangjie_list_regex, html.text)

    with open(path + '\\' + dir_path_name + title_suffix, 'a') as f:
        for zhangjie in zhangjie_list:
            asyn_download(url_prefix + zhangjie)
    print '--------------全部下载完成！撒花撒花~--------------'


# 同步下载
def download(url, dir_path=None):
    print url
    html = requests.get(url)
    title = re.findall(title_regex, html.text)
    text = re.findall(content_regex, html.text)
    title = title[0].encode('latin-1').decode('gbk')
    text = text[0].encode('latin-1').decode('gbk').encode('utf-8')
    with open((dir_path + '\\' + title + title_suffix), 'w+') as f:
        text = text.replace('<br />', '\n').replace('&nbsp;', '')
        f.write(text)


def dhandle(sess, resp):
    title = re.findall(title_regex, resp.text)
    text = re.findall(content_regex, resp.text)
    if len(title) > 0:
        title = title[0].encode('latin-1').decode('gbk')
    else:
        global title_none_num
        title = 'None' + str(title_none_num)
        title_none_num += 1
    if len(text) > 0:
        text = text[0].encode('latin-1').decode('gbk').encode('utf-8')
    else:
        global text_none_num
        text = 'None' + str(text_none_num)
        text_none_num += 1
    text = text.replace('<br />', '\n').replace('&nbsp;', '')
    mark_file(title, text, file=sess.file)


def validate_title(title):
    file_name_regex = r'[\/\\\:\*\?\"\<\>\|]'
    title = re.sub(file_name_regex, '', title)
    return title


def mark_file(title, text, file=None):
    if file:  # 一个文件
        file.write('\n\n' + title.encode('utf-8') + '\n\n')
        file.write(text)
        print '[-] Download: ' + title
    else:  # 一章一个文件
        dir_path = mark_dir_path(path)
        with open((dir_path + '\\' + validate_title(title) + title_suffix), 'w') as f:
            f.write(text)
            print '[-] Download: ' + title


# 异步下载
def asyn_download(url, file=None):
    session.file = file
    future = session.get(url, background_callback=dhandle)
    response = future.result()
    print '[*] ' + url + '  response-status : {0}'.format(response.status_code)


def mark_dir_path(dir_path_name):
    cur_dir_path = os.path.dirname(__file__)
    path = os.path.join(cur_dir_path, dir_path_name)
    if not os.path.isdir(path):
        os.makedirs(path)
    return path


if __name__ == '__main__':
    run()
