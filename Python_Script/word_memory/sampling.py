from numpy.random import exponential
import numpy as np
#for test only
#results=sampling(['a'+str(i) for i in range(800)],160)
def sampling(word_list,num_of_word_for_test):#word list is from the easiest to the most difficult
    total_words=len(word_list)
    if(num_of_word_for_test>117*total_words/1000):
        print('queired_words are too many and total length of word_list is too short!')
        raise NameError        
    difficulty_vector=sorted(exponential(scale=1.0,size=total_words),reverse=True)
    #for test only
    queried_easy_word=int(num_of_word_for_test*10/18)
    queried_middle_word=int(num_of_word_for_test*5/18)
    queried_difficult_word=int(num_of_word_for_test*3/18)

    difficulty_vector=np.array(difficulty_vector)
    easy_list=[word_list[i] for i in range(total_words) if difficulty_vector[i]>2]
    easy_list=np.random.choice(easy_list,size=queried_easy_word,replace=False)
    difficult_list=[word_list[i] for i in range(total_words) if difficulty_vector[i]<1]
    difficult_list=np.random.choice(difficult_list,size=queried_difficult_word,replace=False)
    middle_list=[word_list[i] for i in range(total_words) if (difficulty_vector[i]>=1 and difficulty_vector[i]<=2)]
    middle_list=np.random.choice(middle_list,size=queried_middle_word,replace=False)
    total_sample=[]
    total_sample.extend(easy_list)
    total_sample.extend(middle_list)
    total_sample.extend(difficult_list)
    return total_sample

def sampling_safety_test(num_of_population):
    difficulty_vector=np.array(exponential(scale=1.0,size=num_of_population))
    queried_easy_word=int(num_of_population*10/18)
    if(sum(difficulty_vector>2)>65*num_of_population/1000):
        return 1;
    return 0;
##from matplotlib import pyplot
##pyplot.hist(total_sample)
##pyplot.xlabel('word difficulty')
##pyplot.ylabel('word frequency')
##pyplot.show()
