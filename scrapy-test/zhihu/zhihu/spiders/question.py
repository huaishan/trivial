# -*- coding: utf-8 -*-
import scrapy


class QuestionSpider(scrapy.Spider):
    name = "question"
    allowed_domains = ["www.zhihu.com"]
    start_urls = ['https://www.zhihu.com/']

    def parse(self, response):
        pass
