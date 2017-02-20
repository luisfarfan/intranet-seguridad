from rest_framework import routers
from django.conf.urls import url
from .views import *

router_usuario = routers.DefaultRouter()
# router_usuario.register(r'usuario', UsuarioViewSet)
# router_proyecto.register(r'proyecto_sistema', ProyectoSistemaViewSet)

urlpatterns = [
    url(r'authentication', UserApi.authenticate),
    url(r'usuario_modulos/(?P<usuario_id>.+)/$', ModulosUsuarioViewSet.as_view()),
]
