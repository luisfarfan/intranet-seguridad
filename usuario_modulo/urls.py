from rest_framework import routers
from django.conf.urls import url
from .views import *

router_modulo_usuario = routers.DefaultRouter()
router_modulo_usuario.register(r'rol', CrudRolViewSet)
router_modulo_usuario.register(r'modulo', CrudModuloViewSet)
router_modulo_usuario.register(r'modulos_rol', ReadModulosRolViewSet)
router_modulo_usuario.register(r'permiso', CrudPermisoViewSet)

urlpatterns = [
    url(r'proyecto_sistema_modulos/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$', ReadModuloSerializerRecursive.as_view()),
    url(r'proyecto_sistema_permisos/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
        ReadPermisobyProyectoSistemaViewSet.as_view()),
    
    url(r'edit_modulorol/$', apiModuloRol.editModulosRol),
]
