from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.shortcuts import render_to_response
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
import os
@csrf_exempt

def homepage(request):
    basepath=os.getcwd()
    basepath=basepath[0:len(basepath)-6]
    basepath=basepath+"\\Word_edit\\templates\\Word_edit\\"
    response=(basepath+"index.html");
    return response
