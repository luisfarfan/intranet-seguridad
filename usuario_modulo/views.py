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


class CrudModuloRolViewset(viewsets.ModelViewSet):
    serializer_class = CrudModuloRolSerializer
    queryset = ModuloRol.objects.all()


class ReadModuloSerializerRecursive(generics.ListAPIView):
    serializer_class = ReadModuloSerializer

    def get_queryset(self):
        id_sistema = self.kwargs['id_sistema']
        id_proyecto = self.kwargs['id_proyecto']
        return Modulo.objects.filter(proyectosistema__proyectos_id=id_proyecto,
                                     proyectosistema__sistemas_id=id_sistema)


class apiModuloRol:
    def editModulosRol(request):
        id_rol = request.POST['id_rol']
        delete = request.POST.getlist('delete[]')
        edited = request.POST.getlist('edited[]')

        for i in delete:
            ModuloRol.objects.get(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i)).delete()

        for i in edited:
            print(i)
            modulorol_edited = ModuloRol.objects.filter(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i))
            if modulorol_edited.count() == 0:
                modulorol_added = ModuloRol(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i))
                modulorol_added.save()

        return JsonResponse({'msg': 'Editado exitosamente'})
