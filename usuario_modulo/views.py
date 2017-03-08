from django.http import JsonResponse
from .serializer import *
from .models import Rol, Permiso, Modulo
from rest_framework import generics, viewsets


class CrudRolViewSet(viewsets.ModelViewSet):
    serializer_class = CrudRolSerializer
    queryset = Rol.objects.all()


class ReadModulosRolViewSet(viewsets.ModelViewSet):
    serializer_class = ReadRolSerializer
    queryset = Rol.objects.all()


class ReadModulosRolbyRolModuloViewSet(generics.ListAPIView):
    serializer_class = ReadModuloRolbymodulorolSerializer

    def get_queryset(self):
        id_rol = self.kwargs['rol_id']
        modulo_id = self.kwargs['modulo_id']
        return ModuloRol.objects.filter(rol_id=id_rol, modulo_id=modulo_id)


class CrudPermisoViewSet(viewsets.ModelViewSet):
    serializer_class = CrudPermisoSerializer
    queryset = Permiso.objects.all()


class ReadPermisoGenericosViewSet(generics.ListAPIView):
    serializer_class = CrudPermisoSerializer

    def get_queryset(self):
        return Permiso.objects.filter(proyectosistema__isnull=True)


class ReadPermisobyProyectoSistemaViewSet(generics.ListAPIView):
    serializer_class = CrudPermisoSerializer

    def get_queryset(self):
        id_sistema = self.kwargs['id_sistema']
        id_proyecto = self.kwargs['id_proyecto']
        return Permiso.objects.filter(proyectosistema__proyectos_id=id_proyecto,
                                      proyectosistema__sistemas_id=id_sistema)


class CrudModuloViewSet(viewsets.ModelViewSet):
    serializer_class = CrudModuloSerializer
    queryset = Modulo.objects.all()


class CrudModuloRolViewset(viewsets.ModelViewSet):
    serializer_class = CrudModuloRolSerializer
    queryset = ModuloRol.objects.all()


class ReadModuloRolSerializer(viewsets.ModelViewSet):
    serializer_class = ReadModuloRolSerializer
    queryset = ModuloRol.objects.all()


class ReadModuloSerializerRecursive(generics.ListAPIView):
    serializer_class = ReadModuloSerializer

    def get_queryset(self):
        id_sistema = self.kwargs['id_sistema']
        id_proyecto = self.kwargs['id_proyecto']
        return Modulo.objects.filter(proyectosistema__proyectos_id=id_proyecto,
                                     proyectosistema__sistemas_id=id_sistema)


class apiPermiso:
    def getPermisosProyectoSistema(self, id_proyecto, id_sistema):
        generics_permiso = Permiso.objects.filter(proyectosistema__isnull=True).values()
        proyectosistema_permiso = Permiso.objects.filter(proyectosistema__proyectos_id=id_proyecto,
                                                         proyectosistema__sistemas_id=id_sistema).values()

        return JsonResponse(list(generics_permiso | proyectosistema_permiso), safe=False)


class apiModuloRol():
    def editModulosRol(request):
        id_rol = request.POST['id_rol']
        delete = request.POST.getlist('delete[]')
        edited = request.POST.getlist('edited[]')

        for i in delete:
            ModuloRol.objects.get(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i)).delete()

        for i in edited:
            modulorol_edited = ModuloRol.objects.filter(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i))
            if modulorol_edited.count() == 0:
                modulorol_added = ModuloRol(rol=Rol.objects.get(pk=id_rol), modulo=Modulo.objects.get(pk=i))
                modulorol_added.save()

        return JsonResponse({'msg': 'Editado exitosamente'})

    def savePermisosModuloRol(request):
        print(request)
        modulo_id = request.POST['modulo_id']
        permisos = request.POST.getlist('permiso[]')
        ModuloRolPermisos.objects.filter(modulorol_id=modulo_id).delete()
        for permiso in permisos:
            modulorolpermiso = ModuloRolPermisos()
            modulorolpermiso.modulorol = ModuloRol.objects.get(pk=modulo_id)
            modulorolpermiso.permisos = Permiso.objects.get(pk=permiso)
            modulorolpermiso.save()

        return JsonResponse({'msg': True})


class apiMenu:
    def getMenubyProject(self, id_proyecto):
        menu = ReadModuloSerializer(
            instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
                proyectosistema__proyectos_id=id_proyecto).distinct(),
            many=True).data

        return JsonResponse(list(menu), safe=False)

    def getMenubyProjectSistema(self, id_proyecto, id_sistema):
        menu = ReadModuloSerializer(
            instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
                proyectosistema__proyectos_id=id_proyecto, proyectosistema__sistemas_id=id_sistema).distinct(),
            many=True).data

        return JsonResponse(list(menu), safe=False)
