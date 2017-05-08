from rest_framework import routers
from django.conf.urls import url
from .views import *
from django.contrib.sessions.backends.db import SessionStore

routing_session = SessionStore()

router_webservice = routers.DefaultRouter()
router_webservice.register(r'webservices', WebServiceViewSet)

# urlpatterns = [
#     url(r'getProyectosSiga', ProyectosApi.getProyectosSiga),
#     url(r'get_proyecto_sistema/(?P<id_proyecto>.+)/(?P<id_sistema>.+)/$',
#         ReadProyectoSistemaViewSet.as_view()),
#     url(r'saveProyectoSistema', ProyectosApi.saveProyectoSistema),
# ]
