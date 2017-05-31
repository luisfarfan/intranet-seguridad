from django.apps import AppConfig


class ServicesConfig(AppConfig):
    name = 'services'

    def ready(self):
        # Makes sure all signal handlers are connected
        from . import handler  # noqa
