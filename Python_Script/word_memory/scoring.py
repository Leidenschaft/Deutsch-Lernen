from numpy import random
import numpy as np
import scipy.optimize
from matplotlib import pyplot
total_words=20
#prior probability assumes standard normal distribution
difficulty_vector=np.array(random.exponential(scale=0.5,size=total_words))
binary_vector=random.binomial(1,0.8,total_words)
def fun_to_maximize(beta):
    return sum(-binary_vector*(beta-difficulty_vector))+sum(np.log(1+np.exp(beta-difficulty_vector)))+0.5*beta*beta
#result=scipy.optimize.minimize_scalar(fun_to_maximize,bounds=(-3,3),method='bounded')
#result.x

def test_information_function(beta):
    return 1+sum(np.exp(beta-difficulty_vector)/np.power(1+np.exp(beta-difficulty_vector),2))

ability=2

#scipy.optimize.fsolve(fun_to_solve,1,args=([sum(binary_vector)]))
#possible problem: beta is too large for total_score equals total_words
#and beta is too small for total_score equals zero.
y2=[]
binary_vector=np.zeros(20)
for i in range(21):
    result=scipy.optimize.minimize_scalar(fun_to_maximize,bounds=(-3,3),method='bounded')
    y2.append(result.x)
    if(i<20):
        binary_vector[i]=1
##if True:    
##    line_1, = pyplot.plot(x1,y1, label='difficult')
##    line_2, = pyplot.plot(x1,y2, label='easy')
##    line_3, = pyplot.plot(x1,y3, label='mixed')
##    pyplot.xlabel('total score')
##    pyplot.ylabel('person ability')
##    pyplot.legend(handles=[line_1,line_2,line_3])
##    pyplot.show()
rvar=[]
rmean=[]
for k in range(25):
    p1=1/(1+np.exp(-ability[k]+difficulty_vector))
    score_v=[]
    for j in range(1000):
        binary_v=[random.binomial(1,i,1)[0] for i in p1]
        score_v.append(sum(binary_v))
    score_v_ability=[y2[i] for i in score_v]
    rmean.append(np.mean(score_v_ability)) 
    #rvar.append(np.var(score_v_ability))
for k in range(25):
    p1=1/(1+np.exp(-ability[k]+difficulty_vector))
    ccc=np.zeros((20,21))
    ccc[0,0]=1-p1[0]
    ccc[0,1]=p1[0]
    for i in range(1,20):
        ccc[i,0]=ccc[i-1,0]*(1-p1[i])
        for j in range(1,i+2):
            ccc[i,j]=p1[i]*ccc[i-1,j-1]+(1-p1[i])*ccc[i-1,j]
    rmean_real2.append(sum(ccc[19,:]*y2))#expectation of estimator of ability
    
