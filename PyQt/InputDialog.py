# coding=utf8
import sys
from PyQt4 import QtGui, QtCore


class InputDialog(QtGui.QWidget):
    def __init__(self, parent=None):
        super(QtGui.QWidget, self).__init__()
        self.setGeometry(300, 300, 350, 80)
        self.setWindowTitle('InputDialog')
        self.button = QtGui.QPushButton('Dialog', self)
        self.button.setFocusPolicy(QtCore.Qt.NoFocus)
        self.button.move(20, 20)
        self.connect(self.button, QtCore.SIGNAL('clicked()'), self.showDialog)
        self.setFocus()

        self.label = QtGui.QLineEdit(self)
        self.label.move(130, 22)

    def showDialog(self):
        text, ok = QtGui.QInputDialog.getText(self, 'Input Dialog', 'Enter your name:')
        if ok:
            self.label.setText(unicode(text))


app = QtGui.QApplication(sys.argv)
icon = InputDialog()
icon.show()
sys.exit(app.exec_())
