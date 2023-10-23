# rss_feed/models.py

from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length = 100)
    user = models.ForeignKey(User, on_delete = models.CASCADE)

class Feed(models.Model):
    url = models.URLField()
    category = models.ForeignKey(Category, null = True, on_delete = models.SET_NULL)

class Article(models.Model):
    title = models.CharField(max_length = 300)
    link = models.URLField()
    read = models.BooleanField(default = False)
    feed = models.ForeignKey(Feed, on_delete = models.CASCADE)

class BlacklistedToken(models.Model):
    token = models.CharField(max_length=500)
