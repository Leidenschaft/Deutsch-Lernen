from lxml import etree
f=open('D:/ProjectNote/GermaData/DicTest/Wordlist_1.xml','rb')
st=f.read()
root=etree.fromstring(st)
f=open('D:/ProjectNote/GermaData/DicTest/Wordlist_2.xml','rb')
st=f.read()
root2=etree.fromstring(st)
for i in range(len(root2)):
    root2[i].set('address',str(int(root2[i].get('address'))-19)+'.xml')
def findID(word):
    for i in range(len(root)):
        if(root[i].text==word):
            print "FirstPeriod"
            print str(i+1)+'.xml'
            return
    for i in range(len(root2)):
        if(root2[i].text==word):
            print "SecondPeriod"
            print root2[i].get('address')
            return
    print "not found"
    
    
