from django.conf.urls import url
from .views import *

urlpatterns = [
    # url(r'get_proyecto_sistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
    #     ReadProyectoSistemaViewSet.as_view()),
    # url(r'saveProyectoSistema', ProyectosApi.saveProyectoSistema),
    url(r'authenticate/$', Authenticate.as_view()),
]
