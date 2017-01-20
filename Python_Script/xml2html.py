from lxml import etree
f=open('../Wort/NounRenderTemplate2.xslt','rb')
st=f.read()
xslt_root=etree.XML(st)
transform=etree.XSLT(xslt_root)
for i in range(2,464):
    f=open('../Wort/%d.xml'%i,'rb')
    st=f.read()
    doc=etree.XML(st)
    result_tree=transform(doc)
    f=open('../Wort_html/%d.html'%i,'wb')
    #remove the script
    result_tree.getroot()[1].clear()
    st=etree.tostring(result_tree.getroot(),encoding='utf-8')
    script_starting_address=st.find(b'<script/>')
    st=st[0:script_starting_address]+st[(script_starting_address+9):len(st)]
    f.write(st)
    f.close()
