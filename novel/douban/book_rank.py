# -*- coding: utf-8 -*-
# author=youngwind

import datetime
import re

import requests

url = 'http://book.douban.com/top250?start={0}'
book_regex = r'<a href="(.*?)".*title="(.*?)"'
page_number = 0
page_max = 9
page_count = 25


def timekeeping(func):

    def wrapper(*args, **kwargs):
        time = datetime.datetime.now()
        func(*args, **kwargs)
        print '--------------用时', datetime.datetime.now() - time, '---------------'

    return wrapper


@timekeeping
def run():
    with open('douban_book_rank.txt', 'w') as f:
        global page_number
        global page_count
        global page_max
        while page_number / page_count <= page_max:
            try:
                html_content = requests.get(url.format(page_number)).content
                book_list = re.findall(book_regex, html_content)
                print '[*] GET Url:', url.format(page_number)
            except Exception, e:
                print '[*] GET Url Error:', str(e)
            for i in range(len(book_list)):
                try:
                    rank_str = '{0}. 《{1}》 -> {2}'.format(str(page_number + i), book_list[i][1], book_list[i][0])
                    f.write(rank_str + '\n\n')
                    print '[+] Download:', rank_str
                except Exception, e:
                    print '[-] Error:', str(e)
            page_number += page_count


if __name__ == '__main__':
    run()
