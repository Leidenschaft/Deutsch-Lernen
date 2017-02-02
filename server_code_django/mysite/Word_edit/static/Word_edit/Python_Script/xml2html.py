from lxml import etree
f=open('../Wort_html/NounRenderTemplateForMobileDevice.xslt','rb')
st=f.read()
xslt_root=etree.XML(st)
transform=etree.XSLT(xslt_root)
for i in range(3,464):
    f=open('../Wort/%d.xml'%i,'rb')
    st=f.read()
    doc=etree.XML(st)
    result_tree=transform(doc)
    f=open('../Wort_html/%d.html'%i,'wb')
    #remove the script
    #result_tree.getroot()[1].clear()
    st=etree.tostring(result_tree.getroot(),encoding='utf-8')
    st=st.replace(b'.js"/><script',b'.js"></script><script')
    st=st.replace(b'autocomplete-input-inner',('autocomplete-input-inner%d'%i).encode('ascii'))
    st=st.replace(b'/></head>',b'></script></head>')
    #script_starting_address=st.find(b'<script/>')
    #st=st[0:script_starting_address]+st[(script_starting_address+9):len(st)]
    f.write(st)
    f.close()
