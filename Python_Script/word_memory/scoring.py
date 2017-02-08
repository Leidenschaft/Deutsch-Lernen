from numpy import random
import numpy as np
import scipy.optimize
total_words=20
#prior probability assumes standard normal distribution
difficulty_vector=np.array(random.exponential(scale=0.5,size=total_words))
binary_vector=random.binomial(1,0.8,total_words)
def fun_to_maximize(beta):
    return sum(-binary_vector*(beta-difficulty_vector))+sum(np.log(1+np.exp(beta-difficulty_vector)))+0.5*beta*beta
result=scipy.optimize.minimize_scalar(fun_to_maximize,bounds=(-3,3),method='bounded')
result.x

#scipy.optimize.fsolve(fun_to_solve,1,args=([sum(binary_vector)]))
#possible problem: beta is too large for total_score equals total_words
#and beta is too small for total_score equals zero.
##y2=[]
##binary_vector=np.zeros(20)
##for i in range(21):
##    result=scipy.optimize.minimize_scalar(fun_to_maximize,bounds=(-3,3),method='bounded')
##    y3.append(result.x)
##    if(i<20):
##        binary_vector[i]=1
##if True:    
##    line_1, = pyplot.plot(x1,y1, label='difficult')
##    line_2, = pyplot.plot(x1,y2, label='easy')
##    line_3, = pyplot.plot(x1,y3, label='mixed')
##    pyplot.xlabel('total score')
##    pyplot.ylabel('person ability')
##    pyplot.legend(handles=[line_1,line_2,line_3])
##    pyplot.show()
