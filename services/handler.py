from corsheaders.signals import check_request_enabled
from proyectos.models import ProyectoSistema


# from .models import MySite



def getAllowOriginsProyectosSistemas(url):
    ProyectoSistema.objects.filter(url_base__contains=url)


def cors_allow_mysites(sender, request, **kwargs):
    # if request.META['HTTP_ORIGIN'] in getAllowOriginsProyectosSistemas():
    #     return True
    return True


check_request_enabled.connect(cors_allow_mysites)
