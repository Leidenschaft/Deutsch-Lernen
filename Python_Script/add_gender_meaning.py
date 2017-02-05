from lxml import etree
f=open('../Wordlist_11.xml','rb')
st=f.read()
root=etree.fromstring(st)
##for i in range(1,464):
##    f=open('../Wort/%d.xml'%i,'rb')
##    st=f.read()
##    root_1=etree.fromstring(st)
##    gender=root_1[3].text
##    if(root_1[0].text==root[i-1].text):
##        root[i-1].set('gender',gender)
##        root[i-1].set('chinese',root_1[10][0][0].text)
##    else:
##        print(root_1[0].text+' '+root[i-1].text)
##j=464
##for i in range(1,164):
##    f=open('../Wort/V%d.xml'%i,'rb')
##    st=f.read()
##    root_1=etree.fromstring(st)
##    if(root_1[0].text==root[j+i-2].text):
##        root[j+i-2].set('third_person_present',root_1[3][0][2].text)
##        root[j+i-2].set('perfekt',root_1[3][2][2].text)
##        root[j+i-2].set('chinese',root_1[8][0][0].text)
##    else:
##        print(root_1[0].text+' '+root[j+i-2].text)
##
##
##f=open('tmp.txt','wb')
##f.write(etree.tostring(root,encoding='utf-8',pretty_print=True))
##f.close()

    
