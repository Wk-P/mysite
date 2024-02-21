from django.shortcuts import render
from django.views import View

class RegisterView(View):
    def get(self, request):
        return render(request=request, template_name="register.html")
    
    def post(self, reqeust):
        pass

class LoginView(View):
    def get(self, request):
        return render(request=request, template_name="login.html")
    
    def post(self, reqeust):
        pass