from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import sqlite3
#import scoring
# Create your views here.
def test_config_response(request):
    #num_of_word_for_test=20
    #ability from sqlite3 user
    #word_list<-sqlite wordlist,all words verben Substantiv Adj
    #ability-difficulty>3,filter wordlist
    #['Abend','Apfel',..]
    #[-3,3]
    #Sampling returns ['Baum',..] len()=num_of_word_for_test;
    
    
    return render(request,'Word_test/test_interface.html',{})

from Word_test.sampling import *
def test_one_time(request):
    #return [Abend '1']['Baum' 0']
    #difficulty_vector=[difficulty of Abend,difficulty of Baum,
    #binary_vector=[1,0,..]
    
    #result=scipy.optimize.minimize_scalar(fun_to_maximize,bounds=(-3,3),method='bounded')
    #result.x is the ability,saved to user database
    #ability,ability uncertainly,
    testspeech='substantiv'
    testtype='deutsch'
    length=20
    ability=float(0)
    if length==20:
        sampin=22
    if length==10:
        sampin=11
    db=sqlite3.connect('user')
    cu=db.cursor()
    cu.execute("select * from word where speech = '"+testspeech+"'")
    words=cu.fetchall()#speech is gender 
    words=sorted(words, key=lambda word: float(word[8]))
    inputlist=list([])
    s="<html>"
    for item in words:
        if ability-float(item[8])<=3:
            inputlist.append(item[1])
    samplist=sampling(inputlist,sampin)
    print(len(samplist))
    testset=list([])
    for i in range(length):
        test=organize_question(samplist[i],testtype)
        testset.append(test)
        s=s+"<p>"+str(i+1)+"."+test[0]+"</p><br><p>"
        for j in range(len(test[1])):
            s=s+test[1][j]+"---"
        s=s+test[2]+"</p><br>"
    s=s+"</html>"
    rjs=''' {"test_num":"'''+str(len(testset))+'''",'''
    rjs=rjs+'''"testset":['''
    for test in testset:
        option_num=len(test[1])
        rjs=rjs+'''{"option_num":"'''+str(option_num)+'''",'''
        rjs=rjs+'''"word":"'''+test[3]+'''",'''
        rjs=rjs+'''"question":"'''+test[0]+'''",'''
        for j in range(option_num):
            rjs=rjs+'''"option_'''+chr(97+j)+'''":"'''+test[1][j]+'''",'''
        rjs=rjs+'''"answer":"'''+test[2]+'''"},'''
    rjs=rjs[0:len(rjs)-1]
    rjs=rjs+"]}"
    return HttpResponse(rjs)


def organize_question(word,testtype):
    if testtype=='chinese':
        return organize_question_chinese(word)
    if testtype=='deutsch':
        return organize_question_deutsch(word)
    if testtype=='gender':
        return organize_question_gender(word)

import random
def organize_question_chinese(word):
    db=sqlite3.connect("user")
    cu=db.cursor()
    cu.execute("select chinese , speech from word where entry ='"+word+"'")
    temptuple=cu.fetchall()[0]
    chinese=temptuple[0]
    speech=temptuple[1]
    cu.execute("select chinese from word where speech ='"+speech+"'")
    wordbank=cu.fetchall()
    temp=list([])
    for item in wordbank:
        temp.append(item[0])
    wordbank=temp
    wordbank.remove(chinese)
    confusion=random.sample(wordbank,3)
    confusion.append(chinese)
    random.shuffle(confusion)
    rettuple=(word,confusion,chinese,word)
    return rettuple

def organize_question_deutsch(word):
    db=sqlite3.connect("user")
    cu=db.cursor()
    cu.execute("select chinese , speech from word where entry ='"+word+"'")
    temptuple=cu.fetchall()[0]
    chinese=temptuple[0]
    speech=temptuple[1]
    cu.execute("select entry from word where speech ='"+speech+"'")
    wordbank=cu.fetchall()
    temp=list([])
    for item in wordbank:
        temp.append(item[0])
    wordbank=temp
    wordbank.remove(word)
    confusion=random.sample(wordbank,3)
    confusion.append(word)
    random.shuffle(confusion)
    rettuple=(chinese,confusion,word,word)
    return rettuple

def organize_question_gender(word):
    db=sqlite3.connect("user")
    cu=db.cursor()
    cu.execute("select gender from word where entry ='"+word+"'")
    gender=cu.fetchall()[0][0]
    confusion=['der','die','das','Plural']
    rettuple=(word,confusion,gender,word)
    return rettuple
