from django.urls import path, re_path
from django.views.generic import RedirectView
from views.homeView import homeView
from spider.views import Spider
from usercenter.views import RegisterView, LoginView, DeleteUserView, UserCenterView

urlpatterns = [
    re_path(r'/?$', homeView.as_view(), name="home"),
    re_path(r'bangumi/?$', Spider.as_view(), name="bangumi"),
    re_path(r'login/?$', LoginView.as_view(), name="login"),
    re_path(r'register/?$', RegisterView.as_view(), name="register"),
    re_path(r'delete/?$', DeleteUserView.as_view(), name="delete"),
    re_path(r'usercenter/?$', UserCenterView.as_view(), name="usercenter"),
]