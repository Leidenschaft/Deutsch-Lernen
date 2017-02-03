for i in range(2,464):
    f=open('../Wort_html_for_mobile/%d.html'%i,'rb+')
    st=f.read()
    f.seek(0)
    st=st.replace(b'../jquery',b'../js/jquery')
    f.write(st)
    f.close()
