from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from lxml import etree
transform=''
@csrf_exempt


def index(request):
    template = loader.get_template('Word_edit/index.html')
    return HttpResponse(template.render({},request))

def frameset(request):
    template = loader.get_template('Word_edit/FrameSetTest.html')
    return HttpResponse(template.render({},request))

def searchword(request):
    template = loader.get_template('Word_edit/SearchWord.html')
    return HttpResponse(template.render({},request))

def wordlist(request):
    template = loader.get_template('Word_edit/WordList_11.html')
    return HttpResponse(template.render({},request))

def processXML(request):
    template = loader.get_template('Word_edit/WordList_11.xml')
    return HttpResponse(template.render({},request))

def edit(request):
    template = loader.get_template('Word_edit/editing_interface.html')
    return HttpResponse(template.render({},request))

def word(request):
    p=request.path
    p=p[1:len(p)]
    template = loader.get_template(p)
    return HttpResponse(template.render({},request))

def wordxml(request):
    p=request.path
    p=p[1:len(p)]
    template = loader.get_template(p)
    return HttpResponse(template.render({},request))

import sqlite3
def create_account(request):
    rq=request.POST
    username=rq.get('Username','$0')
    email=rq.get('Email','$1')
    password=rq.get('Password','$2')
    db=sqlite3.connect("user")
    cu=db.cursor()
    cu.execute("select * from user where username='"+username+"';")
    res=cu.fetchall()
    if len(res)>0:
        print("Error: username already existed")
        return
    cu.execute("select * from user where email='"+email+"';")
    res=cu.fetchall()
    if len(res)>0:
        print("Error: email already existed")
        return
    cu.execute("insert into user(username,email,password) values('"+username+"','"+email+"','"+password+"');")
    print(username+" created successfully")
    db.commit()

def login(request):
    rq=request.POST
    username=rq.get('Username','$0')
    password=rq.get('Password','$1')
    db=sqlite3.connect("user")
    cu.execute("select (password) from user where username='"+username+"';")
    res=cu.fetchall()
    if len(res)<1:
        print("Error: username dosen't exist")
        return
    pc=res[0][0]
    if not pc==password:
        print("Error: password incorrect")
        return
    print("Login successfully")
    
# Create your views here.

##def js_load(request,js_file_name):
##    f=open('Word_edit/'+js_file_name,'rb')
##    st=f.read()
##    st=st.decode('utf-8')
##    f.close()
##    return HttpResponse(st)

def results(request, user_name):
    global transform
    try:
            rq=request.POST
            reqsheet=parsegen(rq)
            
    except Exception as e:
        # Redisplay the index.
        return render(request, 'Word_edit/index.html', {
            'error_message': e+' is missing',
        })
    else:
        xml_str=savedit(reqsheet)
        doc=etree.XML(xml_str)
        if not(transform):
            f=open('./Word_edit/templates/Word_edit/NounRenderTemplate2.xslt','rb')
            xslt_root=etree.XML(f.read())
            f.close()
            transform=etree.XSLT(xslt_root)
        result_tree=transform(doc)
        newroot=etree.Element('response')
        newroot.append(etree.Element('info'))
        newroot[0].text=((" %s,you're successfully submitted the basic info of Noun %s.")% (reqsheet[6],reqsheet[0]))
        middle=result_tree.getroot().find('body')
        middle.tag='Korper'
        newroot.append(middle)
        return HttpResponse(etree.tostring(newroot,encoding='utf-8'))

def parsegen(rq):
    wordform=rq.get('Stichwort','$0')
    genus=rq.get('Genus','$1')
    plural=rq.get('Pluralform','$2')
    genitiv=rq.get('GenitivSingular','$3')
    unittype=rq.get('unittype','$4')
    anteil=rq.get('Anteil','$5')
    username=rq.get('UserName','$6')
    reqsheet=[wordform,genus,plural,genitiv,unittype,anteil,username,parseexp(rq),parsesym(rq),parseanm(rq),parsecom(rq),parsedrv(rq),parsecol(rq)]
    return reqsheet

def parseexp(rq):
    explist=list([])
    expcount=0
    expcur=rq.get('explanation_'+str(expcount+1),'$exp')
    while not expcur=='$exp':
        expcount=expcount+1
        samplist=list([])
        sampcount=0
        oricur=rq.get('original_'+str(expcount)+'_'+str(sampcount+1),'$samp')
        while not oricur=='$samp':
            sampcount=sampcount+1
            transcur=rq.get('translation_'+str(expcount)+'_'+str(sampcount),'$samp')
            samptuple=[oricur,transcur]
            if not (samptuple[0][0]=="请"):
                samplist.append(samptuple)
            oricur=rq.get('original_'+str(expcount)+'_'+str(sampcount+1),'$samp')
        exptuple=[expcur,samplist]
        if not (exptuple[0][0]=="请"):
            explist.append(exptuple)
        expcur=rq.get('explanation_'+str(expcount+1),'$exp')
    return explist

def parsesym(rq):
    symlist=list([])
    symcount=0
    symcur=rq.get('Sym_'+str(symcount+1),'$sym')
    while not symcur=='$sym':
        symcount=symcount+1
        symlink=rq.get('Sym_Link_'+str(symcount),'$sym')
        symtuple=[symcur,symlink]
        symlist.append(symtuple)
        symcur=rq.get('Sym_'+str(symcount+1),'$sym')
    if len(symlist)==0:
        return symlist
    if (symlist[len(symlist)-1][0][0]=="请"):
        symlist.pop()
    return symlist

def parseanm(rq):
    anmlist=list([])
    anmcount=0
    anmcur=rq.get('Anm_'+str(anmcount+1),'$anm')
    while not anmcur=='$anm':
        anmcount=anmcount+1
        anmlink=rq.get('Anm_Link_'+str(anmcount),'$anm')
        anmtuple=[anmcur,anmlink]
        anmlist.append(anmtuple)
        anmcur=rq.get('Anm_'+str(anmcount+1),'$anm')
    if len(anmlist)==0:
        return anmlist
    if (anmlist[len(anmlist)-1][0][0]=="请"):
        anmlist.pop()
    return anmlist

def parsecom(rq):
    comlist=list([])
    comcount=0
    comcur=rq.get('compound_'+str(comcount+1),'$com')
    while not comcur=='$com':
        comcount=comcount+1
        comlink=rq.get('compound_Link_'+str(comcount),'$com')
        comtuple=[comcur,comlink]
        comlist.append(comtuple)
        comcur=rq.get('compound_'+str(comcount+1),'$com')
    if len(comlist)==0:
        return comlist
    if (comlist[len(comlist)-1][0][0]=="请"):
        comlist.pop()
    return comlist

def parsedrv(rq):
    drvlist=list([])
    drvcount=0
    drvcur=rq.get('derivative_'+str(drvcount+1),'$drv')
    while not drvcur=='$drv':
        drvcount=drvcount+1
        temp=rq.get('derivative_category_'+str(drvcount),'$drv')
        if temp=="名词":
            drvc="Substantiv"
        if temp=="动词":
            drvc="Verben"
        if temp=="形容词":
            drvc="Adjektiv"
        drvlink=rq.get('derivative_Link_'+str(drvcount),'$drv')
        drvtuple=[drvcur,drvc,drvlink]
        drvlist.append(drvtuple)
        drvcur=rq.get('derivative_'+str(drvcount+1),'$drv')
    if len(drvlist)==0:
        return drvlist
    if (drvlist[len(drvlist)-1][0][0]=="请"):
        drvlist.pop()
    return drvlist

def parsecol(rq):
    collist=list([])
    colcount=0
    colcur=rq.get('collocation_'+str(colcount+1),'$col')
    while not colcur=='$col':
        colcount=colcount+1
        collist.append(colcur)
        colcur=rq.get('collocation_'+str(colcount+1),'$col')
    if len(collist)==0:
        return collist
    if (collist[len(collist)-1][0]=="请"):
        collist.pop()
    return collist

from datetime import *
import time
import codecs
import os
def savedit(entry):
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\edits\\"
    t=datetime.now()
    s=t.strftime("%Y%m%d%H%M%S")
    wordform=entry[0]
    genus=entry[1]
    plural=entry[2]
    genitiv=entry[3]
    unittype=entry[4]
    anteil=entry[5]
    username=entry[6]
    explist=entry[7]
    symlist=entry[8]
    anmlist=entry[9]
    comlist=entry[10]
    drvlist=entry[11]
    collist=entry[12]
    filename=wordform+"_"+username+"_"+s+".xml"
    f=codecs.open(path+filename,'w','utf-8')
    indexfile=codecs.open(path+"edit_record.txt",'a','utf-8')
    indexfile.write(filename+",")
    indexfile.close()
    s='''<Entry category="Substantiv">'''
    s=s+'''<Stichwort>'''+wordform+'''</Stichwort>'''
    s=s+'''<Einheit>'''+unittype+'''</Einheit>'''
    s=s+'''<Anteil>'''+anteil+'''</Anteil>'''
    s=s+'''<Genus>'''+genus+'''</Genus>'''
    s=s+'''<Pluralform>'''+plural+'''</Pluralform>'''
    s=s+'''<GenitivSingular>'''+genitiv+'''</GenitivSingular>'''
    s=s+'''<zusammengesetzteWörter>'''
    s=s+'''<KompositaCollection>'''
    for com in comlist:
        if (com[1]==""):
            s=s+'''<K_>'''+com[0]+'''</K_>'''
        else:
            s=s+'''<K_ link="'''+geturl(com[1])+'''">'''+com[0]+'''</K_>'''
    s=s+'''</KompositaCollection>'''
    s=s+'''<abgeleiteteWörter>'''
    for drv in drvlist:
        if (drv[2]==""):
            s=s+'''<hierzu category="'''+drv[1]+'''">'''+drv[0]+'''</hierzu>'''
        else:
            s=s+'''<hierzu category="'''+drv[1]+'''" link="'''+geturl(drv[2])+'''">'''+drv[0]+'''</hierzu>'''
    s=s+'''</abgeleiteteWörter>'''
    s=s+'''</zusammengesetzteWörter>'''
    s=s+'''<Synonymegruppe>'''
    for sym in symlist:
        if (sym[1]==""):
            s=s+'''<Sym>'''+sym[0]+'''</Sym>'''
        else:
            s=s+'''<Sym link="'''+geturl(sym[1])+'''">'''+sym[0]+'''</Sym>'''
    s=s+'''</Synonymegruppe>'''
    s=s+'''<Antonymegruppe>'''
    for anm in anmlist:
        if (anm[1]==""):
            s=s+'''<Anm>'''+anm[0]+'''</Anm>'''
        else:
            s=s+'''<Anm link="'''+geturl(anm[1])+'''">'''+anm[0]+'''</Anm>'''
    s=s+'''</Antonymegruppe>'''
    s=s+'''<Kollokationen>'''
    for col in collist:
        s=s+'''<K>'''+col+'''</K>'''
    s=s+'''</Kollokationen>'''
    s=s+'''<AllgemeineErläuterungen>'''
    for exptuple in explist:
        s=s+'''<Eintrag>'''
        s=s+'''<Chinesisch>'''+exptuple[0]+'''</Chinesisch>'''
        s=s+'''<BeispielSammlung>'''
        for samptuple in exptuple[1]:
            s=s+'''<Beispiel>'''
            s=s+'''<Satz>'''+samptuple[0]+'''</Satz>'''
            s=s+'''<Übersetzung>'''+samptuple[1]+'''</Übersetzung>'''
            s=s+'''</Beispiel>'''
        s=s+'''</BeispielSammlung>'''
        s=s+'''</Eintrag>'''
    s=s+'''</AllgemeineErläuterungen>'''
    s=s+'''</Entry>'''
    f.write(s)
    f.close
    return s

def check(request):
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\edits\\"
    template = loader.get_template('Word_edit/editing_interface.html')
    indexfile=codecs.open(path+"edit_record.txt",'r',encoding='utf-8')
    s=indexfile.read()
    a=s.split(",")
    if len(a)>0:
        a.pop()
    s="<html>"
    for file in a:
        s=s+'''<a href="/Word_edit/edit_check/show/'''+file+'''">'''+file+"</a>"
        s=s+'''<span style="width:100px;">  </span>'''
        s=s+'''<a href="/Word_edit/edit_check/del/'''+file+'''">放弃</a>'''
        s=s+'''<span style="width:100px;">  </span>'''
        s=s+'''<a href="/Word_edit/edit_check/acc/'''+file+'''">通过</a>'''
        s=s+"<br>"
    s=s+"</html>"
    return HttpResponse(s)

def showedit(request):
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\edits\\"
    p=request.path
    p=p[1:len(p)]
    p=p.replace("edit_check/show","edits")
    template = loader.get_template(p)
    return HttpResponse(template.render({},request))

def deledit(request):
    p=request.path
    p=p[1:len(p)]
    p=p.replace("edit_check/del","edits")
    filename=p[16:]
    delfromlist(filename)
    s='''<html><head>'''+filename+''' Has Been Successfully Deleted!</head><br><a href="/Word_edit/edit_check/">返回</a></html>'''
    return HttpResponse(s)

def accedit(request):
    p=request.path
    p=p[1:len(p)]
    p=p.replace("edit_check/acc","edits")
    filename=p[16:]
    word=filename.split("_")[0]
    wordurl=geturl(word)
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\"
    editedxml=codecs.open(path+"edits\\"+filename,'r',encoding='utf-8')
    s=editedxml.read()
    editedxml.close()
    originalxml=codecs.open(path+"Wort\\"+wordurl,'w',encoding='utf-8')
    originalxml.write(s)
    originalxml.close()
    f=open(path+'Wort\\NounRenderTemplate2.xslt','rb')
    xslt_root=etree.XML(f.read())
    transform=etree.XSLT(xslt_root)
    f.close()
    doc=etree.XML(s)
    result_tree=transform(doc)
    st1=etree.tostring(result_tree.getroot().find('body'),encoding='utf-8')
    html=codecs.open(path+"Wort\\"+wordurl.replace('xml','html'),'w',encoding='utf-8')
    st1=st1.decode('utf-8')
    html.write(st1)
    html.close()
    delfromlist(filename)
    s='''<html><head>'''+filename+''' Has Been Successfully Updated!</head><br><a href="/Word_edit/edit_check/">返回</a></html>'''
    return HttpResponse(s)

def delfromlist(filename):
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\edits\\"
    indexfile=codecs.open(path+"edit_record.txt",'r',encoding='utf-8')
    s=indexfile.read()
    indexfile.close()
    a=s.split(",")
    if len(a)>0:
        a.pop()
    if filename in a:
        a.remove(filename)
        os.remove(path+filename)
    indexfile=codecs.open(path+"edit_record.txt",'w',encoding='utf-8')
    for files in a:
        indexfile.write(files+",")
    if len(a)==0:
        indexfile.write("")
    indexfile.close()

from bs4 import BeautifulSoup
def geturl(word):
    path=os.getcwd()
    path=path+"\\Word_edit\\templates\\Word_edit\\"
    f=codecs.open(path+"Wordlist_11.xml",'r',encoding='utf-8')
    xml=f.read()
    soup=BeautifulSoup(xml)
    node=soup.word
    if (node.string==word):
        find=True
    else:
        find=False
    while not(find):
        node=node.next_sibling.next_sibling
        if (node==None):
            break
        if (node.string==word):
            find=True
    if (find):
        return node.attrs['address']
    return "https://de.wikipedia.org/wiki/"+word

