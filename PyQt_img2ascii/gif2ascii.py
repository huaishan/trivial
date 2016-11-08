# coding=utf8

import os
from PIL import Image, ImageDraw, ImageFont


class Gif2ASCII(object):
    chars = [' ', '.', '~', '+', '1', 'n', 'D', '&']

    def __init__(self, src, resize=1.0):
        # self.ttf_path = os.path.join(os.path.dirname(__file__), 'Consolas.ttf')
        self.ttf_path = 'Consolas.ttf'
        self.src = src
        self.resize = resize
        self.data = []
        self.images = []
        self.size = ()

    def build(self, re=False):
        print 'building...'
        img = Image.open(self.src)
        img.seek(0)
        try:
            while 1:
                self._build(img, re)
                img.seek(img.tell() + 1)
        except EOFError:
            pass

    def _build(self, img, re):
        img = img.convert('L')  # 转换成灰度图像
        w, h = img.size
        h /= 2
        w = int(w * self.resize)
        h = int(h * self.resize)
        img = img.resize((w, h), Image.ANTIALIAS)
        pic = img.load()
        temp_data = []
        for i in range(0, h):
            line = ''
            for j in range(0, w):
                line += self.getchar(pic[j, i], re)
            temp_data.append(line)
        self.data.append(temp_data)
        if not self.size:
            self.size = (int(len(temp_data[0]) * 6), int(len(temp_data) * 12))

    def getchar(self, pi, re):
        for i in range(0, 8):
            if pi < (i + 1) * 32:
                if re:
                    return self.__class__.chars[7 - i]
                else:
                    return self.__class__.chars[i]

    def save(self, fp, fn='defalut'):
        file_path = ''
        first_dir = os.path.join(fp, 'texts')
        second_dir = os.path.join(first_dir, fn)
        self._check_dir(first_dir, second_dir)

        for count in range(len(self.data)):
            file_path = os.path.join(second_dir, u'{0}_{1}.txt'.format(fn, str(count)))
            with open(unicode(file_path), 'w') as f:
                f.write('\n'.join(self.data[count]))
            print 'Succeed!'
        return file_path

    def save_image(self, fp, fn='defalut'):
        file_path = ''
        first_dir = os.path.join(fp, 'images')
        second_dir = os.path.join(first_dir, fn)
        self._check_dir(first_dir, second_dir)

        for count in range(len(self.data)):
            font = ImageFont.truetype(self.ttf_path, 11)
            im = Image.new('RGB', self.size, (12, 16, 33))
            draw = ImageDraw.Draw(im)
            for _i in range(len(self.data[count])):
                draw.text((0, 12 * _i), self.data[count][_i], fill=(248, 248, 248), font=font)
            self.images.append(im)
            file_path = os.path.join(second_dir, u'{0}_{1}.jpg'.format(fn, str(count)))
            im.save(unicode(file_path), 'JPEG')
            print '[+] build: ' + file_path + '_' + str(count) + '.jpg'
        print "[*] Succeed! "
        return file_path

    def _check_dir(self, first_dir, second_dir):
        if not os.path.exists(first_dir):
            os.mkdir(first_dir)
        if not os.path.exists(second_dir):
            os.mkdir(second_dir)
