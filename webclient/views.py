from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.sessions.models import Session
from services.views import getSistemasbyProyectoList, getProyectosList


class IndexView(TemplateView):
    template_name = 'intro.html'

    def get(self, request, *args, **kwargs):
        return super(IndexView, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        key = self.request.GET['key']
        usuario = Session.objects.get(pk=key).get_decoded()['user']
        proyectos = getProyectosList(usuario['id'])
        if 'proyecto_id' in self.request.GET:
            sistemas = getSistemasbyProyectoList(usuario['id'], self.request.GET['proyecto_id'])
        else:
            sistemas = getSistemasbyProyectoList(usuario['id'], proyectos[0]['id'])
        context = {'key': key, 'proyectos': proyectos, 'sistemas': sistemas}
        return context
