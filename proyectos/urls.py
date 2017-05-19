from rest_framework import routers
from django.conf.urls import url
from .views import *

# from django.contrib.sessions.backends.db import SessionStore
# from django.contrib.sessions.models import Session
#
# routing_session = SessionStore()

router_proyecto = routers.DefaultRouter()
router_proyecto.register(r'proyecto', ProyectoViewSet)
router_proyecto.register(r'proyecto_sistema', ProyectoSistemaViewSet)
router_proyecto.register(r'sistemas_proyecto', SistemasbyProyectoViewSet)
router_proyecto.register(r'sistemaproyecto', MYMProyectoSistemaViewSet)

urlpatterns = [
    url(r'getProyectosSiga', ProyectosApi.getProyectosSiga),
    url(r'get_proyecto_sistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
        ReadProyectoSistemaViewSet.as_view()),
    url(r'saveProyectoSistema', ProyectosApi.saveProyectoSistema),
    url(r'prueba/(?P<id>.+)/$',
        UploadView.as_view()),
    url(r'usuariosproyectosistema/(?P<addordelete>.+)/$', AdminProyectoSistema.as_view()),
]
