from django.http import JsonResponse
from .serializer import *
from .models import Rol
from rest_framework.views import APIView
from rest_framework import generics, viewsets


class RolViewSet(viewsets.ModelViewSet):
    serializer_class = ModelRolSerializer
    queryset = Rol.objects.all()


class ModuloRolViewSet(viewsets.ModelViewSet):
    serializer_class = RolSerializer
    queryset = Rol.objects.all()


class PermisoViewSet(viewsets.ModelViewSet):
    serializer_class = PermisoSerializer
    queryset = Permiso.objects.all()
