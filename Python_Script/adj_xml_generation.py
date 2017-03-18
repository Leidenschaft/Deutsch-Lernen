from openpyxl import load_workbook
wb2=load_workbook('../Adj.xlsx')
ws1=wb2.active
from lxml import etree
root=etree.Element('Wordlist')
for i in range(99):
    root.append(etree.Element('Word'))

for i in range(99):
	root[i].text=ws1['B'+str(i+2)].value
	root[i].set('address','A%d.xml'%(i+1))
	root[i].set('chinese',ws1['D'+str(i+2)].value)

##f=open('../Wort/A75.xml','rb')
##st=f.read()
##
##for i in range(2,101):
##    root=etree.fromstring(st)
##    root[0].text=ws1['B'+str(i)].value
##    root[1].text=str(ws1['C'+str(i)].value)
##    root[2].text=str(ws1['F'+str(i)].value)
##    root[7][0][0].text=ws1['D'+str(i)].value
##    root[7][0][1][0][0].text=ws1['A'+str(i)].value
##    f=open('../Adj/A%d.xml'%(i-1),'wb')
##    st_pre=b'<?xml version="1.0" encoding="utf-8" standalone="yes"?>\
##    <!DOCTYPE Entry SYSTEM "AdjModel.dtd">\
##    <?xml-stylesheet type="text/xsl" href="AdjRenderTemplate.xslt"?>'
##    f.write(st_pre+etree.tostring(root,pretty_print=True,encoding='utf-8'))
##    f.close()
