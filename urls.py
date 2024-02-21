from django.urls import path
from views.homeView import home
from spider.views import Spider
from usercenter.views import RegisterView, LoginView

urlpatterns = [
    path("", home.as_view(), name="home"),
    path("bangumi", Spider.as_view(), name="bangumi"),
    path("login", LoginView.as_view(), name="login"),
    path("register", RegisterView.as_view(), name="register"),
]