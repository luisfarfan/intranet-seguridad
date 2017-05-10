from rest_framework.views import APIView
from rest_framework import generics, viewsets
from django.http import JsonResponse
from django.db.models import F, FloatField, Sum
from django.db.models import Count, Value
from django.contrib.sessions.backends.db import SessionStore
from usuario.models import Usuario
from proyectos.models import *
from usuario_modulo.models import *
from django.contrib.sessions.models import Session


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
        return JsonResponse(response, safe=False)


def moduloRecursive(modulopadre_id):
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


class MenuRolProyectoSistema(APIView):
    def get(self, request, rol, codigoproyectosistema):
        pass


class InformacionUser(APIView):
    def get(self, request, idusuario):
        pass


class UsersRolProyectoSistema(APIView):
    def get(self, request, rol, codigoproyectosistema):
        pass


class UsersProyectoSistema(APIView):
    def get(self, request, codigoproyectosistema):
        pass


class InformacionUserbyDNI(APIView):
    def get(self, request, dni):
        pass
