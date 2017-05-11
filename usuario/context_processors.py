# -*- coding: utf-8 -*-
from usuario.utils import *
from usuario_modulo.serializer import ReadModuloSerializer, ReadModuloRolSerializer
from usuario_modulo.models import *
from services.views import modulosTree


def recursive_menu(request):
    if request.is_secure():
        scheme = 'https://'
    else:
        scheme = 'http://'

    base_url = scheme + request.get_host()
    modulo_id = None
    if 'MODULO_ID' in request.session:
        modulo_id = request.session['MODULO_ID']
    menu = modulosTree(1)
    context = {
        "menu": drawSidebar(menu, base_url, modulo_id),
    }

    return {'CLIENT_MENU': context}
