import requests
from importlib import import_module
from django.conf import settings
from django.contrib.sessions.models import Session
from django.http.response import JsonResponse
from rest_framework import status


def islogged(func):
    def wrapper(*args, **kwargs):
        request = args[0]
        key = request.META['HTTP_AUTHORIZATION']
        try:
            sesion = Session.objects.get(pk=key)
        except Session.DoesNotExist:
            sesion = None

        if sesion is None:
            return JsonResponse({'msg': 'Key invalida'}, status=status.HTTP_403_FORBIDDEN)

        return func(*args, **kwargs)

    return wrapper

# def logged(func):
#     def wrapper(*args, **kwargs):
#         request = args[0]
#         key = request.GET.get('key')
#         code = request.GET.get('code')
#         project = request.GET.get('project')
#         data = []
#         dato = None
#
#         if key is not None and code is not None and project is not None:
#             r = requests.get(settings.URL_USERDATASESSION.format(key))
#             data = r.json()
#             msg = data.get('msg')
#
#             if msg is not None:
#                 if msg == 'Key no valida':
#                     return redirect(settings.URL_SEGURIDAD)
#
#             data = data['data']
#             menus = data['modulos'][project]['menu']
#             individuales = data['modulos'][project]['modulos_individuales']
#             menu = None
#
#             for m in menus:
#                 if len(m) > 0:
#                     if m['codigo'] == code:
#                         menu = m
#                         break
#             user = data['user_data']
#             dato = {"user": user, "menu": menu, "individuales": individuales, "project": project, "code": code}
#             request.session['data_session'] = dato
#             if not request.session.session_key:
#                 request.session.save()
#         else:
#             dato = request.session.get('data_session')
#             if dato is None:
#                 return redirect(settings.URL_SEGURIDAD)
#
#         kwargs['data'] = dato
#         return func(*args, **kwargs)
#
#     return wrapper
