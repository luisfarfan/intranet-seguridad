from django.http import JsonResponse
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from .models import Usuario
from usuario_modulo.models import Modulo, ModuloRolPermisos
from usuario_modulo.serializer import ModuloSerializer
from django.contrib.sessions.models import Session


class UserApi(object):
    def authenticate(request):
        if request.is_ajax() and request.method == 'POST':
            usuario = request.POST['usuario']
            clave = request.POST['clave']
            user = Usuario.objects.filter(usuario=usuario, clave=clave)

            if user:
                user_data = user.values()
                for i in user_data:
                    i['fecha_nacimiento'] = i['fecha_nacimiento'].strftime("%d/%m/%Y")
                    i['fecha_contrato_inicio'] = i['fecha_contrato_inicio'].strftime("%d/%m/%Y")
                    i['fecha_contrato_fin'] = i['fecha_contrato_fin'].strftime("%d/%m/%Y")
                    if i['fecha_contrato_extended'] is not None:
                        i['fecha_contrato_extended'] = i['fecha_contrato_extended'].strftime("%d/%m/%Y")

                        # routes = Modulo.objects.exclude(proyectosistema__isnull=True).filter(
                        #   modulorol__modulorolpermisos__modulorolpermisosusuario__usuario__pk=user[0].id).values('slug',
                        #                                                                                         'template_html')
                routes = Modulo.objects.filter(proyectosistema__isnull=True).values('slug', 'template_html')
                # menu = ModuloSerializer(instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
                #   modulorol__modulorolpermisos__modulorolpermisosusuario__usuario__pk=user[0].id).distinct(),
                #                      many=True).data
                menu = ModuloSerializer(instance=Modulo.objects.exclude(proyectosistema__isnull=True).distinct(),
                                        many=True).data

                request.session['user_data'] = user_data[0]
                request.session['routes'] = list(routes)
                if not request.session.session_key:
                    request.session.save()
                session_id = request.session.session_key
                session = Session.objects.get(pk=session_id)
                session_return = session.get_decoded()
                session_return['session_key'] = session_id
                return JsonResponse({'id_user': 1}, safe=False)

            return JsonResponse({}, safe=False)


class ModulosUsuarioViewSet(generics.ListAPIView):
    # queryset = Modulo.objects.all()
    serializer_class = ModuloSerializer

    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        return Modulo.objects.exclude(proyectosistema__isnull=True).filter(
            modulorol__modulorolpermisos__modulorolpermisosusuario__usuario__pk=usuario_id).distinct()


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
