total_words=1000
from numpy.random import exponential
importance_vector=exponential(scale=1.0,size=total_words)
queried_word=100
queried_easy_word=int(queried_word*10/18)
queried_middle_word=int(queried_word*5/18)
queried_difficult_word=int(queried_word*3/18)
import numpy as np
importance_vector=np.array(importance_vector)

easy_list=np.random.choice(importance_vector<1,size=queried_easy_word)
difficult_list=np.random.choice(importance_vector>1,size=queried_difficult_word)

logical_table=np.logical_and((importance_vector>1),(importance_vector<=2))
middle_list=np.random.choice(importance_vector[logical_table],size=queried_middle_word)

total_sample=[]
total_sample.extend(easy_list)
total_sample.extend(middle_list)
total_sample.extend(difficult_list)

    

