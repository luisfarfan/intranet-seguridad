from rest_framework import routers
from django.conf.urls import url
from .views import *

router_usuario = routers.DefaultRouter()
router_usuario.register(r'usuario', UsuarioViewset)
router_usuario.register(r'usuario_detalle', UsuarioDetalleViewSet)
# router_proyecto.register(r'proyecto_sistema', ProyectoSistemaViewSet)

urlpatterns = [
    url(r'authentication', UserApi.authenticate),
    url(r'usuario_modulos/(?P<usuario_id>.+)/$', ModulosUsuarioViewSet.as_view()),
    url(r'proyecto/(?P<slug>.+)/$', DemoView.as_view()),
    url(r'getUserJsonData/(?P<rol>.+)/$', UserApi.getJsonbyRol),
]
