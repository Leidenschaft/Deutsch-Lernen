from lxml import etree
mode='n'#mode='v' or 'n'
if(mode=='n'):
    f=open('../Wort/NounRenderTemplate2.xslt','rb')
else:
    f=open('../Wort/VerbRenderTemplate.xslt','rb')
    
st=f.read()
xslt_root=etree.XML(st)
transform=etree.XSLT(xslt_root)
#verben 1~164
#noun 1~463
for i in range(1,464):
    if(mode=='n'):
        f=open('../Wort/%d.xml'%i,'rb')
    else:
        f=pen('../Wort/V%d.xml'%i,'rb')
    st=f.read()
    doc=etree.XML(st)
    result_tree=transform(doc)
    if(mode=='n'):
        f=open('../Wort_html_for_desktop/%d.html'%i,'wb')
    else:
        f=open('../Wort_html_for_desktop/V%d.html'%i,'wb')
    #remove the script
    #result_tree.getroot()[1].clear()
    st=etree.tostring(result_tree.getroot(),encoding='utf-8')
    #replace for picture ../images/287.jpg
    if(mode=='n'):
        st=st.replace(b'</head>',b'</head>\n{% load static %} \n')
    else:
        st=st.replace(b'<html>',b'<html>{% load static %}\n');
    st=st.replace(b'../jquery-1.9.1.min.js"/>',b"{% static 'Word_edit/jquery-1.9.1.min.js' %}\"></script>")
    st=st.replace(b'BufferSearch.js"/>',b"{% static 'Word_edit/BufferSearch.js' %}\"></script>")
    st=st.replace(b'snd_sfx.png',b"{% static 'Word_edit/snd_sfx.png'%}");
    st=st.replace(b'icon16_search.png',b"{% static 'Word_edit/icon16_search.png'%}");
    #st=st.replace(b'autocomplete-input-inner',('autocomplete-input-inner%d'%i).encode('ascii'))
    if(mode=='v'):
        st=st.replace(b'style.css',b"{% static 'Word_edit/css/style.css' %}")#for VerbNoun
    st=st.replace(b'.xml',b'.html')
    #script_starting_address=st.find(b'<script/>')
    #st=st[0:script_starting_address]+st[(script_starting_address+9):len(st)]
    f.write(st)
    f.close()
