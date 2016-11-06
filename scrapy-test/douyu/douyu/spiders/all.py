# -*- coding: utf-8 -*-
import scrapy
from scrapy import log

from douyu.items import DouyuItem


class AllSpider(scrapy.Spider):
    name = "all"
    allowed_domains = ["douyu.com"]
    start_urls = ['https://www.douyu.com/directory/all?page=%s&isAjax=1' % i for i in range(1, 74)]

    domain = 'https://www.douyu.com'

    page_count = None
    cur_page = 1
    page_count_rule = "//div[@class='tcd-page-code']/a[@class='shark-pager-item'][last()]/text()"

    def check_page_count(self, response):
        if not self.page_count:
            self.page_count = int(response.xpath(self.page_count_rule).extract()[0])

    def parse(self, response):
        log.msg('Parse '+response.url)

        # with open('douyu.html', 'wb') as f:
        #     f.write(response.body)
        #
        # return response.body

        # self.check_page_count(response)

        for sel in response.xpath("//li"):
            item = DouyuItem()
            item['url'] = self.domain + sel.xpath("a/@href").extract()[0]
            item['room_name'] = sel.xpath("a/@title").extract()[0]
            item['tag'] = sel.xpath("a/div/div/span/text()").extract()[0]
            item['people_count'] = sel.xpath("a/div/p/span[@class='dy-num fr']/text()").extract()[0]
            item['anchor'] = sel.xpath("a/div/p/span[@class='dy-name ellipsis fl']/text()").extract()[0]
            yield item
