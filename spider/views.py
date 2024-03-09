from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from spider.spider import spider_get
from usercenter.views import get_body
from spider.spider import read_cookies_file

class Spider(View):
    def get_bangumi_list(self):
        data = spider_get()
        if data == []:
            return JsonResponse({"response": "null"})
        else:
            return JsonResponse({"response": data})

    def get(self, request):
        if request.COOKIES.get('user_id'):
            return render(request=request, template_name="bangumi.html")
        else:
            return render(request=request, template_name="login.html")
    
    def post(self, request):
        body = get_body(request)
        request_class_string = body.get('request_class')
        if request_class_string == "spider":
            return self.get_bangumi_list()
        elif request_class_string == "watch":
            cookies_file_path = "./spider/cookies.txt"
            cookies_string = read_cookies_file(cookies_file_path)
            return JsonResponse({"success": True, "msg": 0, "cookies_string": cookies_string})
        else:
            return JsonResponse({"success": False, "msg": 1})
