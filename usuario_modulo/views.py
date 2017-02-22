from django.http import JsonResponse
from .serializer import *
from .models import Rol, Permiso, Modulo
from rest_framework.views import APIView
from rest_framework import generics, viewsets


class CrudRolViewSet(viewsets.ModelViewSet):
    serializer_class = CrudRolSerializer
    queryset = Rol.objects.all()


class ReadModulosRolViewSet(viewsets.ModelViewSet):
    serializer_class = ReadRolSerializer
    queryset = Rol.objects.all()


class CrudPermisoViewSet(viewsets.ModelViewSet):
    serializer_class = CrudPermisoSerializer
    queryset = Permiso.objects.all()


class CrudModuloViewSet(viewsets.ModelViewSet):
    serializer_class = CrudModuloSerializer
    queryset = Modulo.objects.all()


class ReadModuloSerializerRecursive(generics.ListAPIView):
    serializer_class = ReadModuloSerializer

    def get_queryset(self):
        id_sistema = self.kwargs['id_sistema']
        id_proyecto = self.kwargs['id_proyecto']
        return Modulo.objects.filter(proyectosistema__proyectos_id=id_proyecto,
                                     proyectosistema__sistemas_id=id_sistema)
