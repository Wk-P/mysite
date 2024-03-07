from django.shortcuts import render
from django.views import View

class home(View):
    def get(self, request):
        if request.session.get('user_id'):
            return render(request=request, template_name='home.html')
        else:
            return render(request=request, template_name="login.html")