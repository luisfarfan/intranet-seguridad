from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'getUserData/(?P<user_id>.+)/$', Shared.getDataUser),
]
