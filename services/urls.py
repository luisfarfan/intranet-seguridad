from django.conf.urls import url
from .views import *

urlpatterns = [
    # url(r'get_proyecto_sistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
    #     ReadProyectoSistemaViewSet.as_view()),
    # url(r'saveProyectoSistema', ProyectosApi.saveProyectoSistema),
    url(r'authenticate/$', Authenticate.as_view()),
    url(r'menubyproyectosistema/(?P<codigoproyectosistema>.+)/$',
        MenuProyectoSistema.as_view()),
    url(r'menubyproyecto/(?P<proyecto_id>.+)/$', MenuProyecto.as_view()),
    url(r'menubyrol_proyectosistema/(?P<codigoproyectosistema>.+)/(?P<rol>.+)/$',
        MenuRolProyectoSistema.as_view()),
    url(r'infouser/(?P<id_usuario>.+)/$', InfoUser.as_view()),
    url(r'userbyrol/(?P<rol>.+)/$', UsersRol.as_view()),
    url(r'userbyproyectosistema/(?P<codigoproyectosistema>.+)/$', UsersProyectoSistema.as_view()),
    url(r'proyectoslist/(?P<id_usuario>.+)/$', ProyectosList.as_view()),
    url(r'sistemasbyproyectolist/(?P<id_usuario>.+)/(?P<proyecto>.+)/$', SistemabyProyectosList.as_view()),
    url(r'userbyproyectosistema/(?P<codigoproyectosistema>.+)/$', UsersProyectoSistema.as_view()),
    url(r'filterusers/$', FilterUsers.as_view()),
]
