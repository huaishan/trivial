# coding=utf8

from PIL import Image


class Img2ASCII(object):
    chars = [' ', '.', '~', '+', '1', 'n', 'D', 'M']

    def __init__(self, src, resize=1.0):
        self.src = src
        self.resize = resize
        self.data = []

    def build(self, re=False):
        print '构建中...'
        img = Image.open(self.src)
        if img.mode == 'P' or img.mode == 'RGBA':
            im = Image.new('RGB', img.size, 'white')
            im.paste(img.convert('RGBA'), img.convert('RGBA'))
            img = im
        img = img.convert('L')  # 转换成灰度图像
        w, h = img.size
        h /= 2
        w = int(w * self.resize)
        h = int(h * self.resize)
        img = img.resize((w, h), Image.ANTIALIAS)
        pic = img.load()
        for i in range(0, h):
            line = ''
            for j in range(0, w):
                line += self.getchar(pic[j, i], re)
            self.data.append(line)

    def getchar(self, pi, re):
        for i in range(0, 8):
            if pi < (i + 1) * 32:
                if re:
                    return self.__class__.chars[7 - i]
                else:
                    return self.__class__.chars[i]

    def save(self):
        with open(self.src + '.txt', 'w') as f:
            f.write('\n'.join(self.data))
        print '处理完成!'


i2a = Img2ASCII('c440e0a7e369dce7d377db86a57cbd9c_b.jpg', 0.5)
i2a.build()
# i2a.build(re=True)
i2a.save()


