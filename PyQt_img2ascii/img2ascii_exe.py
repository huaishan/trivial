# coding=utf8
import sys
from PyQt4 import QtGui, QtCore
import gif2ascii


class Img2ascii(QtGui.QWidget):
    def __init__(self, parent=None):
        super(QtGui.QWidget, self).__init__()
        self.setFixedSize(350, 155)
        self.setWindowTitle(u'图片转字符')
        self.button = QtGui.QPushButton(u'选择图片', self)
        self.fp_button = QtGui.QPushButton(u'保存路径', self)
        self.condense_button = QtGui.QPushButton(u'缩放比例', self)
        self.build_txt_button = QtGui.QPushButton(u'转换为文本', self)
        self.build_img_button = QtGui.QPushButton(u'转换为图片', self)
        self.slider = QtGui.QSlider(QtCore.Qt.Horizontal, self)

        self.button.setFocusPolicy(QtCore.Qt.NoFocus)
        self.button.move(20, 20)
        self.fp_button.move(20, 50)
        self.condense_button.move(20, 80)
        self.build_txt_button.move(160, 120)
        self.build_img_button.move(250, 120)

        self.label = QtGui.QLineEdit(self)
        self.label.setReadOnly(True)
        self.label.setGeometry(200, 20, 210, 20)
        self.label.move(120, 22)

        self.fp_label = QtGui.QLineEdit(self)
        self.fp_label.setReadOnly(True)
        self.fp_label.setGeometry(200, 20, 210, 20)
        self.fp_label.move(120, 52)

        self.compress_ratio_label = QtGui.QLineEdit(self)
        self.compress_ratio_label.setReadOnly(True)
        self.compress_ratio_label.setGeometry(200, 50, 40, 20)
        self.compress_ratio_label.move(120, 82)
        self.compress_ratio_label.setText('100%')

        self.slider.setFixedWidth(150)
        self.slider.setMaximum(100)
        self.slider.setMinimum(1)
        self.slider.setValue(100)
        self.slider.move(175, 83)

        self.connect(self.button, QtCore.SIGNAL('clicked()'), self.show_dialog)
        self.connect(self.fp_button, QtCore.SIGNAL('clicked()'), self.set_fp_dialog)
        self.connect(self.build_txt_button, QtCore.SIGNAL('clicked()'), self.build_ascii_txt)
        self.connect(self.build_img_button, QtCore.SIGNAL('clicked()'), self.build_ascii_img)
        self.connect(self.slider, QtCore.SIGNAL('valueChanged(int)'), self.set_slider_num)
        self.setFocus()

    def show_dialog(self):
        text = QtGui.QFileDialog.getOpenFileName(self, 'Open file Dialog', "/", "Image files(*.jpg & *.png & *.gif)")
        self.label.setText(unicode(text))

    def set_fp_dialog(self):
        text = QtGui.QFileDialog.getExistingDirectory(self, u'请选择文件夹')
        self.fp_label.setText(unicode(text))

    def build_ascii_img(self):
        self._save(save_type='img')

    def build_ascii_txt(self):
        self._save(save_type='txt')

    def set_slider_num(self):
        self.compress_ratio_label.setText(str(self.slider.value()) + '%')

    def _save(self, save_type):
        if not self.label.text():
            QtGui.QMessageBox.critical(self, "Error", u"请选择图片！", QtGui.QMessageBox.Yes)
        elif not self.fp_label.text():
            QtGui.QMessageBox.critical(self, "Error", u"请选择保存路径！", QtGui.QMessageBox.Yes)
        else:
            try:
                fp = self._save_something(save_type)
                QtGui.QMessageBox.information(self, "Success", u"转换成功，文件保存在: \n" + fp, QtGui.QMessageBox.Yes)
            except Exception, e:
                QtGui.QMessageBox.critical(self, "Error", unicode(e), QtGui.QMessageBox.Yes)

    def _save_something(self, save_type='txt'):
        fp = ''
        g2a = gif2ascii.Gif2ASCII(unicode(self.label.text()), resize=(self.slider.value()/100.0))
        g2a.build()
        if save_type == 'txt':
            fp = g2a.save(unicode(self.fp_label.text()), fn=unicode(self.label.text()).split('/')[-1])
        elif save_type == 'img':
            fp = g2a.save_image(unicode(self.fp_label.text()), fn=unicode(self.label.text()).split('/')[-1])
        return fp


app = QtGui.QApplication(sys.argv)
icon = Img2ascii()
icon.show()
sys.exit(app.exec_())

