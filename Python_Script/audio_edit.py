from lxml import etree
import os
Ls=[]
st_head=b'<?xml version="1.0" encoding="utf-8" standalone="no"?>\
<!DOCTYPE Entry SYSTEM "NounModel.dtd">\
<?xml-stylesheet type="text/xsl" href="NounRenderTemplate2.xslt"?>'

for filename in os.listdir('../audio/'):
    Ls.append(filename.split('.')[0])
for i in range(4,464):
    f=open('../Wort/%d.xml'%i,'rb')
    st=f.read()
    root=etree.fromstring(st)
    stichwort=root[0].text
    if(Ls.count(stichwort)>0):
        root[0].set('Audio','true')
        st=etree.tostring(root,pretty_print=True,encoding='utf-8')
        f=open('../Wort/%d.xml'%i,'wb')
        f.write(st_head+st)
        f.close()
    #st=etree.tostring(result_tree.getroot(),encoding='utf-8')
    #st=st.replace(b'.js"/><script',b'.js"></script><script')
    #st=st.replace(b'autocomplete-input-inner',('autocomplete-input-inner%d'%i).encode('ascii'))
    #st=st.replace(b'/></head>',b'></script></head>')
    #script_starting_address=st.find(b'<script/>')
    #st=st[0:script_starting_address]+st[(script_starting_address+9):len(st)]
    #f.write(st)
    #f.close()
