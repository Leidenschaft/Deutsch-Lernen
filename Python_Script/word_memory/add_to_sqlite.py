import sqlite3
db=sqlite3.connect("D:/Python3.4/DeutschLernen/db.sqlite3")
cu=db.cursor()
from lxml import etree
f=open('../../Wordlist_11.xml','rb')
st=f.read()
f.close()
root=etree.fromstring(st)

