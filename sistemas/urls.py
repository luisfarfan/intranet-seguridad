from rest_framework import routers
from django.conf.urls import url
from .views import *

router_sistema = routers.DefaultRouter()
router_sistema.register(r'sistema', SistemaViewSet)
