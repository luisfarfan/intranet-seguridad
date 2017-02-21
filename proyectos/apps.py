from django.apps import AppConfig


class ProyectosConfig(AppConfig):
    name = 'proyectos'

    def ready(self):
        print('ready')
        from . import signals
