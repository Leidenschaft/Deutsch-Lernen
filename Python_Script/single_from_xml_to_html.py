from lxml import etree
f=open('../Wort/NounRenderTemplate2.xslt','rb')
xslt_root=etree.XML(f.read())
transform=etree.XSLT(xslt_root)

f=open('../Wort/1.xml','rb')
st=f.read()
doc=etree.XML(st)
result_tree=transform(doc)
st1=etree.tostring(result_tree.getroot().find('body'),encoding='utf-8')
#st=st.replace(b'</head>',b'</head>\n{% load static %} \n')
#st=st.replace(b'../jquery-1.9.1.min.js"/>',b"{% static 'Word_edit/jquery-1.9.1.min.js' %}\"></script>")
#st=st.replace(b'BufferSearch.js"/>',b"{% static 'Word_edit/BufferSearch.js' %}\"></script>")
#st=st.replace(b'snd_sfx.png',b"{% static 'Word_edit/snd_sfx.png'%}");
#st=st.replace(b'icon16_search.png',b"{% static 'Word_edit/icon16_search.png'%}");
#st=st.replace(b'.xml',b'.html')
#f=open('../Wort_html_for_desktop/%d.html'%i,'wb')
#f.write(st)
#f.close()


