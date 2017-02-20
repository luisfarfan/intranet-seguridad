from rest_framework import routers
from django.conf.urls import url
from .views import *
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.sessions.models import Session

routing_session = SessionStore()

router_proyecto = routers.DefaultRouter()
router_proyecto.register(r'proyecto', ProyectoViewSet)
router_proyecto.register(r'proyecto_sistema', ProyectoSistemaViewSet)
router_proyecto.register(r'sistemas_proyecto', SistemasbyProyectoViewSet)

urlpatterns = [
    url(r'getProyectosSiga', ProyectosApi.getProyectosSiga),
    url(r'saveProyectoSistema', ProyectosApi.saveProyectoSistema),
]
