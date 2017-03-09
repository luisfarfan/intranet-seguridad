from django.http import JsonResponse
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from .models import Usuario
from usuario_modulo.models import Modulo, ModuloRolPermisos, ModuloRol
from usuario_modulo.serializer import ReadModuloSerializer, ReadModuloRolSerializer
from django.contrib.sessions.models import Session
from usuario.utils import *


class UserApi(object):
    def authenticate(request):
        if request.is_ajax() and request.method == 'POST':
            usuario = request.POST['usuario']
            clave = request.POST['clave']
            user = Usuario.objects.filter(usuario=usuario, clave=clave)

            if user:
                user_data = user.values()
                routes = Modulo.objects.filter(proyectosistema__isnull=True).values('slug', 'template_html')
                menu = ReadModuloSerializer(
                    instance=Modulo.objects.exclude(proyectosistema__isnull=True).distinct(),
                    many=True).data

                request.session['user_data'] = user_data[0]
                request.session['routes'] = list(routes)
                request.session['menu'] = menu
                if not request.session.session_key:
                    request.session.save()
                session_id = request.session.session_key
                session = Session.objects.get(pk=session_id)
                session_return = session.get_decoded()
                session_return['session_key'] = session_id
                return JsonResponse(session_return, safe=False)

            return JsonResponse({}, safe=False)

    def getJsonbyRol(self, rol):
        menu = ReadModuloSerializer(
            instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
                proyectosistema__proyectos_id=1).distinct(),
            many=True).data

        id_modulos_rol = ModuloRol.objects.filter(rol=rol).values_list('modulo_id', flat=True)
        return JsonResponse(getMenuRol(menu, id_modulos_rol), safe=False)


class ModulosUsuarioViewSet(generics.ListAPIView):
    # queryset = Modulo.objects.all()
    serializer_class = ReadModuloSerializer

    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        return Modulo.objects.exclude(proyectosistema__isnull=True).filter(
            modulorol__modulorolpermisos__modulorolpermisosusuario__usuario__pk=usuario_id).distinct()


class UsuarioViewset(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = Usuario.objects.all()


class UsuarioDetalleViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioDetalleSerializer
    queryset = Usuario.objects.all()


from django.views.generic import TemplateView


class DemoView(TemplateView):
    def get_template_names(self):
        try:
            routers = self.request.session['routes']
            slug = self.kwargs.get('slug')
            for router in routers:
                if router['slug'] == slug:
                    return router['template_html']
            return 'demo.html'
        except:
            return 'demo.html'
