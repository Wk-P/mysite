from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
import json
from usercenter.models import User
import hashlib
from django.http import HttpResponse


def create_user_login_cookie(user):
    response = HttpResponse("Cookies Set")
    response.set_cookie("user_id", f"{user.id}")
    return response


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
        print(request.path)
        return render(request=request, template_name="register.html")
    
    def post(self, request):
        body = get_body(request)
        username = body["username"]
        password = body["password"]

        hash_password = string_to_hash(password)

        # IF user has been existed
        user = User.objects.filter(username=username)
        if user.exists():
            return JsonResponse({"success": False, "msg": 1})
        else:
            if request.COOKIES.get('user_id'):
                user = User(username=username, password=hash_password)
                user.save()
                return JsonResponse({"success": True, "msg": 0})
            else:
                return JsonResponse({"success": False, "msg": 2})

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
            return JsonResponse({"success": False, "msg": 1})
        else:
            if authenticate(username, password):
                response = create_user_login_cookie(user[0])
                return response
            else:
                return JsonResponse({"success": False, "msg": 2})
            

class DeleteUserView(View):
    def get(self, request):
        if request.COOKIES.get('user_id'):
            return render(request=request, template_name="delete_user.html")
        else:
            return render(request=request, template_name="login.html")
    
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
                    request.session.flush()
                    response = HttpResponse("Delete successful")
                    response.delete_cookie("user_id")
                    return response
                except:
                    return JsonResponse({'success': False, "msg": 3})
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
        if request.COOKIES.get('user_id'):
            return render(request=request, template_name='usercenter.html')
        else:
            return render(request=request, template_name="login.html")
        
    def post(self, request):
        body = get_body(request=request)
        request_class_string = body.get('request_class')
        if request.COOKIES.get('user_id'):
            if request_class_string == 'logout':
                # 清理session
                request.session.flush()

                # 清理cookies
                response = HttpResponse("Logout successful")
                response.delete_cookie("user_id")
                return response
            else:
                # 未完待续的其他功能
                return JsonResponse({"success": False, "msg": 1})
        else:
            return JsonResponse({"success": False, "msg": 2})
            


        

        