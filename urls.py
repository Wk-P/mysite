from django.urls import path
from views.homeView import home
from spider.views import Spider

urlpatterns = [
    path("", home.as_view(), name="home"),
    path("bangumi", Spider.as_view(), name="bangumi"),
]