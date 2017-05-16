from rest_framework.views import APIView
from rest_framework import generics, viewsets
from django.http import JsonResponse
from django.contrib.sessions.backends.db import SessionStore
from proyectos.models import *
from usuario_modulo.models import *
from django.contrib.sessions.models import Session
from usuario.serializer import *


# class LocalZonaViewSet(viewsets.ModelViewSet):
#     queryset = LocalZonas.objects.all()
#     serializer_class = LocalZonasSerializer
#
#


class Authenticate(APIView):
    def post(self, request):
        usuario = request.data['usuario']
        clave = request.data['clave']

        try:
            user = Usuario.objects.get(usuario=usuario, clave=clave)
        except Usuario.DoesNotExist:
            user = None

        if user:
            s = SessionStore()
            # s['last_login'] = 1376587691
            s['id_usuario'] = user.id
            s.create()
            request.session['id_usuario'] = user.id
            session = Session.objects.get(pk=s.session_key)
            return JsonResponse({'key': s.session_key, 'valid': True})
        return JsonResponse({'key': 'invalid', 'valid': False})


class Logout(APIView):
    def post(self, request):
        key = request.data['key']
        try:
            Session.objects.get(pk=key).delete()
        except Session.DoesNotExist:
            return JsonResponse({'message': 'Key no existe'})

        return JsonResponse({'message': 'Sessión finalizada'})


class UserProfile(APIView):
    def post(self, request):
        key = request.data['key']
        try:
            Session.objects.get(pk=key).delete()
        except Session.DoesNotExist:
            return JsonResponse({'message': 'Key no existe'})

        return JsonResponse({'message': 'Sessión finalizada'})


class MenuProyectoSistema(APIView):
    def get(self, request, codigoproyectosistema):
        modulopadre = Modulo.objects.filter(proyectosistema__codigo=codigoproyectosistema,
                                            modulo_padre__isnull=True)[0]
        response = []
        response.append({'id': modulopadre.id, 'nombre': modulopadre.nombre, 'descripcion': modulopadre.descripcion,
                         'slug': modulopadre.slug,
                         'codigo': modulopadre.codigo,
                         'template_html': modulopadre.template_html,
                         'is_padre': modulopadre.is_padre, 'icon': modulopadre.icon,
                         'hijos': moduloRecursive(modulopadre.id),
                         'modulo_padre_id': modulopadre.modulo_padre_id}, )
        return JsonResponse(response, safe=False)


class MenuProyecto(APIView):
    def get(self, request, proyecto_id):
        response = modulosTree(proyecto_id)
        return JsonResponse(response, safe=False)


class MenuRolProyectoSistema(APIView):
    def get(self, request, codigoproyectosistema, rol):
        response = modulosbyRolTree(codigoproyectosistema, rol)
        return JsonResponse(response, safe=False)


def modulosTree(proyecto_id):
    modulopadres = Modulo.objects.filter(proyectosistema__proyectos_id=proyecto_id,
                                         modulo_padre__isnull=True)
    response = []
    for modulopadre in modulopadres:
        response.append({'id': modulopadre.id, 'nombre': modulopadre.nombre, 'descripcion': modulopadre.descripcion,
                         'slug': modulopadre.slug,
                         'codigo': modulopadre.codigo,
                         'template_html': modulopadre.template_html,
                         'is_padre': modulopadre.is_padre, 'icon': modulopadre.icon,
                         'hijos': moduloRecursive(modulopadre.id),
                         'modulo_padre_id': modulopadre.modulo_padre_id}, )
    return response


def modulosbyRolTree(proyectosistema, rol):
    modulopadres = Modulo.objects.filter(proyectosistema__codigo=proyectosistema,
                                         modulo_padre__isnull=True)
    response = []
    for modulopadre in modulopadres:
        response.append({'id': modulopadre.id, 'nombre': modulopadre.nombre, 'descripcion': modulopadre.descripcion,
                         'slug': modulopadre.slug,
                         'codigo': modulopadre.codigo,
                         'template_html': modulopadre.template_html,
                         'is_padre': modulopadre.is_padre, 'icon': modulopadre.icon,
                         'hijos': modulosbyRolRecursive(modulopadre.id, rol),
                         'modulo_padre_id': modulopadre.modulo_padre_id}, )
    return response


def moduloRecursive(modulopadre_id, rol=None):
    response = []
    modulos = Modulo.objects.filter(modulo_padre_id=modulopadre_id)
    if modulos.count():
        for modulo in modulos:
            response.append({'id': modulo.id, 'nombre': modulo.nombre, 'descripcion': modulo.descripcion,
                             'slug': modulo.slug,
                             'codigo': modulo.codigo,
                             'template_html': modulo.template_html,
                             'is_padre': modulo.is_padre, 'icon': modulo.icon,
                             'modulo_padre_id': modulo.modulo_padre_id})
            nowindex = len(response) - 1
            if len(moduloRecursive(response[nowindex]['id'])):
                response[nowindex]['hijos'] = moduloRecursive(response[nowindex]['id'])
    return response


def modulosbyRolRecursive(modulopadre_id, rol=None):
    response = []
    modulos = Modulo.objects.filter(modulo_padre_id=modulopadre_id)
    if rol:
        rolesmodulos = Modulo.objects.filter(roles__codigo=rol, is_padre=0).values_list('id', flat=True)
    if modulos.count():
        for modulo in modulos:
            if modulo.is_padre == 0 and modulo.id in rolesmodulos:
                response.append({'id': modulo.id, 'nombre': modulo.nombre, 'descripcion': modulo.descripcion,
                                 'slug': modulo.slug,
                                 'codigo': modulo.codigo,
                                 'template_html': modulo.template_html,
                                 'is_padre': modulo.is_padre, 'icon': modulo.icon,
                                 'modulo_padre_id': modulo.modulo_padre_id})
                nowindex = len(response) - 1
                if len(moduloRecursive(response[nowindex]['id'])):
                    response[nowindex]['hijos'] = moduloRecursive(response[nowindex]['id'], rol)
            elif modulo.is_padre == 0 and modulo.id not in rolesmodulos:
                pass
            else:
                response.append({'id': modulo.id, 'nombre': modulo.nombre, 'descripcion': modulo.descripcion,
                                 'slug': modulo.slug,
                                 'codigo': modulo.codigo,
                                 'template_html': modulo.template_html,
                                 'is_padre': modulo.is_padre, 'icon': modulo.icon,
                                 'modulo_padre_id': modulo.modulo_padre_id})
                nowindex = len(response) - 1
                if len(moduloRecursive(response[nowindex]['id'])):
                    response[nowindex]['hijos'] = moduloRecursive(response[nowindex]['id'], rol)
    return response


class InfoUser(generics.ListAPIView):
    serializer_class = UsuarioDetalleSerializer

    def get_queryset(self):
        id_usuario = self.kwargs['id_usuario']
        return Usuario.objects.filter(pk=id_usuario)


class UsersRolProyectoSistema(generics.ListAPIView):
    serializer_class = UsuarioDetalleSerializer

    def get_queryset(self):
        rol = self.kwargs['rol']
        return Usuario.objects.filter(rol_id=rol)


class UsersProyectoSistema(generics.ListAPIView):
    serializer_class = UsuarioDetalleSerializer

    def get_queryset(self):
        codigoproyectosistema = self.kwargs['codigoproyectosistema']
        roles = Rol.objects.filter(modulo__proyectosistema__codigo=codigoproyectosistema).values_list('id', flat=True)
        return Usuario.objects.filter(rol__in=roles)


class ProyectosList(generics.ListAPIView):
    def get(self, request, id_usuario):
        usuario = Usuario.objects.get(pk=id_usuario)
        proyectos = Modulo.objects.filter(roles=usuario.rol_id).values_list('proyectosistema__proyectos',
                                                                            flat=True).distinct()
        proyectosList = Proyecto.objects.filter(id__in=proyectos).values()
        return JsonResponse(list(proyectosList), safe=False)


class SistemabyProyectosList(generics.ListAPIView):
    def get(self, request, id_usuario, proyecto):
        usuario = Usuario.objects.get(pk=id_usuario)
        proyectosistema = Modulo.objects.filter(roles=usuario.rol_id,
                                                proyectosistema__proyectos_id=proyecto).values_list(
            'proyectosistema__proyectos',
            flat=True).distinct()
        proyectosistemaList = ProyectoSistema.objects.filter(proyectos__in=proyectosistema).values()
        return JsonResponse(list(proyectosistemaList), safe=False)
