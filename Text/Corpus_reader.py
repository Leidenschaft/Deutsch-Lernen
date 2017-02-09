from nltk.corpus import reader
my_fileids=[]
import re
##for i in range(1,10):
##    my_fileids.append('Text%d-A.txt'%i)
##    my_fileids.append('Text%d-B.txt'%i)
##    my_fileids.append('Text%d-1.txt'%i)
##my_fileids.append('Text2-2.txt')
##my_fileids.append('Text6-2.txt')
##my_fileids.append('Text8-2.txt')
##my_fileids.append('Text10-1.txt')
#my_fileids.append(re.compile(r'Text[1-9]-[12AB].txt'))
my_reader=reader.PlaintextCorpusReader(root='./',fileids=r'Text[0-9]+-[12AB].txt',encoding='utf-8')
my_words=my_reader.words()
my_words_set=set(my_words)
import nltk
my_fdist=nltk.FreqDist(my_reader.words())
my_keys=sorted(my_fdist.keys())
text=nltk.Text(my_words)
example_index=nltk.text.ConcordanceIndex(my_words)
Dic={}
Dic['sich']=['sich','mich']
Dic['steigen']=['steigen']
Dic['um']=['um','Um']
def findCommon(v1,v2=[]):
    Ls=[]
    for verben in v1:
        Ls.extend(example_index.offsets(verben))
    Ls_2=[]
    for i in Ls:
        if(len(v2)==0 or len(v2)+len(set(my_words[(i-10):(i+10)]))>len(set(my_words[(i-10):(i+10)]+v2))):
            Ls_2.append(' '.join(my_words[(i-10):(i+10)]))
    return Ls_2
#f=open('output.txt','wb')
#for i in my_keys:
#    f.writelines(i+'\t'+str(my_fdist[i])+'\n')
#f.close()
##for i in range (1,10):
##	f=open('Text%d-A.txt'%i,'rb')
##	st=f.read()
##	root[1].append(etree.Element('div'))
##	root[1][2*(i-1)].text=st.decode('utf-8')
##	f=open('Text%d-B.txt'%i,'rb')
##	st=f.read()
##	root[1].append(etree.Element('div'))
##	root[1][2*(i-1)+1].text=st.decode('utf-8')
##if(True):
##    f=open('xiaokai_txt.html','wb')
##    f.write(etree.tostring(root,encoding='utf-8',pretty_print=True))
##    f.close()

##Adj statistic
##f=open('Adj.txt','rb')
##st=f.read()
##st=st[3:len(st)]
##Ls=st.decode('utf-8').split('\r\n')
##Ls.pop(0)
##Adj_cnt_Lst=[]
##for i in Ls:
##    cnt_tmp=my_words.count(i)
##    cnt_tmp+=my_words.count(i[0].upper()+i[1:len(i)])
##    cnt_tmp+=my_words.count(i+'e')
##    cnt_tmp+=my_words.count(i[0].upper()+i[1:len(i)]+'e')
##    cnt_tmp+=my_words.count(i+'es')
##    cnt_tmp+=my_words.count(i[0].upper()+i[1:len(i)]+'es')
##    cnt_tmp+=my_words.count(i+'en')
##    cnt_tmp+=my_words.count(i+'em')
##    cnt_tmp+=my_words.count(i[0].upper()+i[1:len(i)]+'en')
##    Adj_cnt_Lst.append(cnt_tmp)


#noun statistic
##f=open('../Wordlist_11.xml','rb')
##st=f.read()
##from lxml import etree
##root=etree.fromstring(st)
##Ls=[root[i].text for i in range(464)]
##Noun_cnt_Lst=[]
##for i in Ls:
##    cnt_tmp=my_words.count(i)
##    cnt_tmp+=my_words.count(i+'e')
##    cnt_tmp+=my_words.count(i+'es')
##    cnt_tmp+=my_words.count(i+'n')
##    cnt_tmp+=my_words.count(i+'s')
##    cnt_tmp+=my_words.count(i+'en')
##    Noun_cnt_Lst.append(cnt_tmp)
##
