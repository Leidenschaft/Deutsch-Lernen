from django.conf.urls import url
from django.conf import settings
from . import views
app_name='polls'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    # ex: /polls/5/
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/5/results/
    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /polls/5/vote/
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),]
    #match js file request
    #url(r'^(?P<js_file_name>[A-Za-z_]+.js)/$',views.js_load,name='js_load'),
