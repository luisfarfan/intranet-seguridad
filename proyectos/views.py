from django.http import JsonResponse
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from .models import ProyectosSiga


# Create your views here.
class ProyectoViewSet(viewsets.ModelViewSet):
    serializer_class = ProyectoSerializer
    queryset = Proyecto.objects.all()


class ProyectoSistemaViewSet(viewsets.ModelViewSet):
    serializer_class = ProyectosSistemasSerializer
    queryset = ProyectoSistema.objects.all()


class SistemasbyProyectoViewSet(viewsets.ModelViewSet):
    serializer_class = SistemasxProyectoSerializer
    queryset = Proyecto.objects.all()


class ProyectosApi:
    def getProyectosSiga(request):
        proyectos = list(Proyecto.objects.values_list('id_siga', flat=True))
        proyectos_disponibles = ProyectosSiga.objects.using('consecucion').exclude(id__in=proyectos).values()

        return JsonResponse(list(proyectos_disponibles), safe=False)

    def saveProyectoSistema(request):
        id_proyecto = request.POST['id_proyecto']
        id_sistemas = request.POST.getlist('id_sistemas[]')
        bulk = []
        for i in id_sistemas:
            bulk.append(
                ProyectoSistema(sistemas=Sistema.objects.get(pk=i), proyectos=Proyecto.objects.get(pk=id_proyecto)))

        ProyectoSistema.objects.bulk_create(bulk)

        return JsonResponse({'msg': True}, safe=False)
