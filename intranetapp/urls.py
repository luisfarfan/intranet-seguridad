"""intranetapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from proyectos.urls import router_proyecto
from sistemas.urls import router_sistema
from usuario.urls import router_usuario
from usuario_modulo.urls import router_modulo_usuario
from django.views.generic import TemplateView
from usuario_modulo.models import Modulo
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views import View
from django.http import HttpResponse
from django.template import RequestContext, Template, loader
from .utils import getBreadcumbs

urlpatterns = []

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest_proyectos/', include(router_proyecto.urls)),
    url(r'^rest_sistemas/', include(router_sistema.urls)),
    url(r'^rest_usuario/', include(router_usuario.urls)),
    url(r'^rest_modulousuario/', include(router_modulo_usuario.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^usuario/', include('usuario.urls', namespace='usuario')),
    url(r'^rest_proyectos/', include('proyectos.urls', namespace='proyectos')),
    url(r'^login/', ensure_csrf_cookie(TemplateView.as_view(template_name='login.html')))
]


class DinamicView(View):
    template_name = ''
    modulo_id = ''
    breadcumbs = ''

    def get(self, request):
        template = loader.get_template(self.template_name)
        request.session['MODULO_ID'] = self.modulo_id
        context = {
            'modulo_id': self.modulo_id,
            'breadcumbs': self.breadcumbs
        }
        return HttpResponse(template.render(context, request))


modulos_routes = Modulo.objects.all()

for menu in modulos_routes:
    if menu.is_padre == 0:
        urlpatterns.append(
            url(r'^' + menu.slug + '/',
                ensure_csrf_cookie(DinamicView.as_view(template_name=menu.template_html, modulo_id=menu.id,
                                                       breadcumbs=getBreadcumbs(menu.id)))))
