from django.urls import path
from views.homeView import homeView
from spider.views import Spider
from usercenter.views import RegisterView, LoginView, DeleteUserView, UserCenterView

urlpatterns = [
    path("", homeView.as_view(), name="home"),
    path("bangumi", Spider.as_view(), name="bangumi"),
    path("login", LoginView.as_view(), name="login"),
    path("register", RegisterView.as_view(), name="register"),
    path("delete", DeleteUserView.as_view(), name="delete"),
    path("usercenter", UserCenterView.as_view(), name='usercenter'),
]