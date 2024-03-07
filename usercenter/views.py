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
    try:
        User.objects.get(username=username, password=string_to_hash(password))
        return True
    except:
        return False

    
def get_body(request) -> dict:
    return json.loads(request.body)


def findUser(username):
    user = User.objects.filter(username=username)
    if not user.exists():
        return False
    else:
        return user[0]


class RegisterView(View):
    def get(self, request):
        return render(request=request, template_name="register.html")
    
    def post(self, request):
        body = get_body(request)
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
        body = get_body(request)
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
            

class DeleteUserView(View):
    def get(self, request):
        return render(request=request, template_name="delete_user.html")
    
    def post(self, request):
        body = get_body(request)
        username = body.get('username')
        password = body.get('password')

        user = User.objects.filter(username=username)
        if not user.exists():
            return JsonResponse({"success": False, "msg": 1})
        else:
            if authenticate(username, password):
                try:
                    user[0].delete()
                except:
                    return JsonResponse({'success': False, "msg": 3})
                return JsonResponse({"success": True, "msg": 0})
            else:
                return JsonResponse({"success": False, "msg": 2})
            
 
class SearchUserView(View):
    def get(self, request):
        return render(request=request, template_name="search_user.html")
    
    def post(self, request):
        body = get_body(request)
        username = body.get('username')
        
        if findUser(username):
            # TODO 重置密码
            pass
        else:
            # msg: 1  没找到
            return JsonResponse({"success": False, "msg": 1})


class UserCenterView(View):
    def get(self, request):
        return render(request=request, template_name='usercenter.html')
    
    def post(self, request):
        body = get_body(request=request)
        