from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.contrib.sessions.models import Session
from services.views import getSistemasbyProyectoList, getProyectosList
from django.shortcuts import redirect


class IndexView(TemplateView):
    template_name = 'intro.html'
    user = None

    def get(self, request, *args, **kwargs):
        key = request.GET['key']
        try:
            self.user = Session.objects.get(pk=key).get_decoded()
            self.user = self.user['user']
        except Session.DoesNotExist:
            print(request.META['HTTP_HOST'])
            return redirect('http://{}'.format(request.META['HTTP_HOST']))

        return super(IndexView, self).get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)

        proyectos = getProyectosList(self.user['id'])
        if 'proyecto_id' in self.request.GET:
            sistemas = getSistemasbyProyectoList(self.user['id'], self.request.GET['proyecto_id'])
        else:
            sistemas = getSistemasbyProyectoList(self.user['id'], proyectos[0]['id'])
        context = {'key': self.request.GET['key'], 'proyectos': proyectos, 'sistemas': sistemas}
        if 'proyecto_id' in self.request.GET:
            context['proyecto_id'] = int(self.request.GET['proyecto_id'])

        return context
