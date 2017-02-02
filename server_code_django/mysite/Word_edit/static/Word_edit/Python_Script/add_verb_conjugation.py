#can handle simple verben automatically completion of conjugation,
#data from wikitionary server
from bs4 import BeautifulSoup
import urllib.request
from lxml import etree
word_to_search='surfen'
fileName='V89.xml'
f=open('../Wort/'+fileName,'rb')
st=f.read()
root=etree.fromstring(st)
response=urllib.request.urlopen('https://en.wiktionary.org/wiki/'+word_to_search)
html=response.read()
st_pre=b'<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE Entry SYSTEM "VerbenModel.dtd"><?xml-stylesheet type="text/xsl" href="VerbRenderTemplate.xslt"?>'
soup=BeautifulSoup(html,'html.parser')
nodes=soup.find("div",class_="NavFrame")
content_head=nodes.find("div",class_="NavHead")
Ls=[['habe','hast','hat','haben','habt','haben'],['bin','bist','ist','sind','seid','sind']]
if(content_head.text.find(word_to_search)>0):
    content_nodes=nodes.find("div",class_="NavContent")
    present_node=content_nodes.find('th',string='present')
    ich_element=present_node.find_next("td")
    root[3][0][0].text=ich_element.find(['a','strong']).text
    wir_element=ich_element.find_next("td")
    root[3][0][3].text=wir_element.find(['a','strong']).text
    du_element=wir_element.find_next("tr").find_next("td")
    root[3][0][1].text=du_element.find(['a','strong']).text
    ihr_element=du_element.find_next("td")
    root[3][0][4].text=ihr_element.find(['a','strong']).text
    er_element=ihr_element.find_next("tr").find_next("td")
    root[3][0][2].text=er_element.find(['a','strong']).text
    sie_element=er_element.find_next("td")
    root[3][0][5].text=sie_element.find(['a','strong']).text
    preterite_node=content_nodes.find('th',string='preterite')
    ich_element=preterite_node.find_next("td")
    root[3][1][0].text=ich_element.find(['a','strong']).text
    wir_element=ich_element.find_next("td")
    root[3][1][3].text=wir_element.find(['a','strong']).text
    du_element=wir_element.find_next("tr").find_next("td")
    root[3][1][1].text=du_element.find(['a','strong']).text
    ihr_element=du_element.find_next("td")
    root[3][1][4].text=ihr_element.find(['a','strong']).text
    er_element=ihr_element.find_next("tr").find_next("td")
    root[3][1][2].text=er_element.find(['a','strong']).text
    sie_element=er_element.find_next("td")
    root[3][1][5].text=sie_element.find(['a','strong']).text
    past_participle_node=content_nodes.find('th',string='past participle')
    perfect_form=past_participle_node.find_next('td').find(['a','strong']).text
    auxiliary_form=past_participle_node.find_next('tr').find(['a','strong']).text
    root[3][2].set('hilfsverb',auxiliary_form)
    word_index=0
    if(auxiliary_form=='sein'):
        word_index=1
    root[3][2][0].text=Ls[word_index][0]+' '+perfect_form
    root[3][2][1].text=Ls[word_index][1]+' '+perfect_form
    root[3][2][2].text=Ls[word_index][2]+' '+perfect_form
    root[3][2][3].text=Ls[word_index][3]+' '+perfect_form
    root[3][2][4].text=Ls[word_index][4]+' '+perfect_form
    root[3][2][5].text=Ls[word_index][5]+' '+perfect_form
    st_towrite=st_pre+etree.tostring(root,pretty_print='true',encoding='utf-8')
    f=open('../Wort/'+fileName,'wb')
    f.write(st_towrite)
    f.close()
else:
    print('the required conjugation table not found!')

