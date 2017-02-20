from django.http import JsonResponse
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics, viewsets


# Create your views here.
class SistemaViewSet(viewsets.ModelViewSet):
    serializer_class = SistemaSerializer
    queryset = Sistema.objects.all()
