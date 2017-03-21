from django.conf.urls import url
from .views import *

urlpatterns = [
    url(r'getUserData/$', Shared.getDataUser),
    url(r'authenticate/$', Shared.authentication),
    url(r'proyectosistema_user/(?P<proyecto>[\w\-]+)/(?P<sistema>[\w\-]+)/', getUsuariosporProyectoSistema),
]
