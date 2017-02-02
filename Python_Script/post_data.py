import requests
url='http://127.0.0.1:8000/Word_edit/results/zhaofeng-shu33/'
data={'Stichwort':'Abend','Genus':'der','Pluralform':'Abends','GenitivSingular':'Abends'}
data['UserName']='赵丰'
r=requests.post(url,data)
r.text
