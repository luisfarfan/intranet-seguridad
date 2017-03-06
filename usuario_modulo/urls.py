from rest_framework import routers
from django.conf.urls import url
from .views import *

router_modulo_usuario = routers.DefaultRouter()
router_modulo_usuario.register(r'rol', CrudRolViewSet)
router_modulo_usuario.register(r'modulo', CrudModuloViewSet)
router_modulo_usuario.register(r'modulos_rol', ReadModulosRolViewSet)
router_modulo_usuario.register(r'permiso', CrudPermisoViewSet)
router_modulo_usuario.register(r'modulos_rol_recursive', ReadModuloRolSerializer)

urlpatterns = [
    url(r'proyecto_sistema_modulos/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$', ReadModuloSerializerRecursive.as_view()),
    url(r'proyecto_sistema_permisos/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
        ReadPermisobyProyectoSistemaViewSet.as_view()),

    url(r'edit_modulorol/$', apiModuloRol.editModulosRol),
    url(r'permisos_genericos/$', ReadPermisoGenericosViewSet.as_view()),
    url(r'permisos_proyectosistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$', apiPermiso.getPermisosProyectoSistema),
    url(r'menubyproject/(?P<id_proyecto>.+)/$', apiMenu.getMenubyProject),
    url(r'menubyprojectsistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$', apiMenu.getMenubyProjectSistema),
    url(r'permisos_modulorol/(?P<rol_id>.+)/(?P<modulo_id>.+)/$', ReadModulosRolbyRolModuloViewSet.as_view()),
    url(r'save_permisos_modulorol/$', apiModuloRol.savePermisosModuloRol),
]
