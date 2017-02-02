from django.conf.urls import url

from . import views
app_name='Word_edit'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    #match js file request ex:/Word_edit/jquery.js
    #url(r'^(?P<js_file_name>[A-Za-z_]+.js)/$',views.js_load,name='js_load'),
    #match /Word_edit/results/user_name/
    url(r'^results/(?P<user_name>[A-Za-z1-9_\-]+)/$',views.results,name='results'),
    url(r'^FrameSetTest\.html$',views.frameset,name='frameset'),
    url(r'^SearchWord\.html$',views.searchword,name='searchword'),
    url(r'^WordList_11\.html$',views.wordlist,name='wordlist'),
    url(r'^WordList_11.xml.*',views.processXML,name='processXML'),
    url(r'^Wordlist_11.xml',views.processXML,name='processXML'),
    url(r'^Wort/\S*\.xml$',views.wordxml,name='wordxml'),
    url(r'^client_form/editing_interface\.html$',views.edit,name='edit'),
    url(r'^Wort/\S*\.html$',views.word,name='word'),
    url(r'^edit_check$',views.check,name='check'),
    url(r'^edit_check/\S*\.xml$',views.showedit,name='showedit'),]
