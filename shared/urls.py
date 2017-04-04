from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'getUserData/$', Shared.getDataUser),
    url(r'authenticate/$', Shared.authentication),
    url(r'proyectosistema_user/(?P<proyecto>[\w\-]+)/(?P<sistema>[\w\-]+)/$',
        PersonalPorProyectoSistemaViewSet.as_view()),
    url(r'proyectosistema_user/(?P<proyecto>[\w\-]+)/(?P<sistema>[\w\-]+)/(?P<rol_codigo>[\w\-]+)/$',
        getUsuariosporProyectoSistemaFilterRol),
    url(r'getMenu/$', Shared.getMenu),
]
