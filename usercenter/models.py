from django.db import models

class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=400)
    update_time = models.TimeField(auto_now=True)