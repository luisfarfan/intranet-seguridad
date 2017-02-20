from rest_framework import routers
from django.conf.urls import url
from .views import *

router_modulo_usuario = routers.DefaultRouter()
router_modulo_usuario.register(r'rol', RolViewSet)
router_modulo_usuario.register(r'modulos_rol', ModuloRolViewSet)
router_modulo_usuario.register(r'permiso', PermisoViewSet)
