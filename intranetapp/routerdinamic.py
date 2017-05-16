from django.views.generic import TemplateView, ListView
from django.shortcuts import redirect


class RenderTemplate(TemplateView):
    def get_template_names(self):
        try:
            data = self.request.GET['key']
            slug = 'modulos/{}'.format(self.kwargs.get('slug'))
            for modulo in data:
                if modulo['slug'] == slug:
                    self.request.session['modulo_id'] = modulo['id']
                    return modulo['template_html']
            return '404.html'
        except:
            return '404.html'

    def get_context_data(self, **kwargs):
        context = super(RenderTemplate, self).get_context_data(**kwargs)
        try:
            modulos = self.request.session['user_session']['modulos']['CPV']['modulos_individuales']
            slug = 'modulos/{}'.format(self.kwargs.get('slug'))
            for modulo in modulos:
                if modulo['slug'] == slug:
                    context['breadcumbs'] = modulo['descripcion']
                    context['session_key'] = self.request.session.session_key
            return context
        except:
            return redirect('http://cpv.inei.gob.pe')
