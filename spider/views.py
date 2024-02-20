from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from spider.spider import spider_get


class Spider(View):
    def get(self, request):
        return render(request=request, template_name="bangumi.html")
    
    def post(self, request):
        data = spider_get()

        return JsonResponse({"response": data})

