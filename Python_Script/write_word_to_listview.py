from lxml import etree
f=open('../Wordlist_11.xml','rb')
st=f.read()
wordlist=etree.fromstring(st)
root=etree.Element('wordList')
for i in range(463):
    root.append(etree.Element('li'))
    root[i].append(etree.Element('a'))
    root[i][0].text=wordlist[i].text
    root[i][0].set('href','Word_html/'+wordlist[i].get('address'))

st=etree.tostring(root,pretty_print=True,encoding='utf-8')
f=open('test.xml','wb')
f.write(st)
f.close()
