from rest_framework.views import APIView
from rest_framework import generics, viewsets
from django.http import JsonResponse
from django.db.models import F, FloatField, Sum
from django.db.models import Count, Value
from django.contrib.sessions.backends.db import SessionStore
from usuario.models import Usuario
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
        pass


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
