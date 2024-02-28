from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
import json
from usercenter.models import User
import hashlib

def string_to_hash(string:str) -> str:
    hash_object = hashlib.sha256()
    hash_object.update(string.encode())
    return hash_object.hexdigest()


def authenticate(username:str, password:str):
    hash_password = string_to_hash(password)
    try:
        User.objects.get(username=username, password=hash_password)
        return True
    except:
        return False
    
class RegisterView(View):
    def get(self, request):
        return render(request=request, template_name="register.html")
    
    def post(self, request):
        
        body = json.loads(request.body)
        username = body["username"]
        password = body["password"]

        hash_password = string_to_hash(password)

        # IF user has been existed
        user = User.objects.filter(username=username)
        if user.exists():
            return JsonResponse({"success": False, "msg": 2})
        else:
            user = User(username=username, password=hash_password)
            user.save()
            return JsonResponse({"success": True, "msg":0, "data":{"username": username, "password": password}})


class LoginView(View):
    def get(self, request):
        return render(request=request, template_name="login.html")
    
    def post(self, request):
        
        body = json.loads(request.body)
        username = body["username"]
        password = body["password"]

        # IF user has been existed
        user = User.objects.filter(username=username)
        if not user.exists():
            return JsonResponse({"success": False, "msg": 2})
        else:
            if authenticate(username, password):
                return JsonResponse({"success": True, "msg": 0, "data": [username, password]})
            else:
                return JsonResponse({"success": False, "msg": 1})