# -*- coding: utf-8 -*-
from usuario.utils import *
from usuario_modulo.serializer import ReadModuloSerializer, ReadModuloRolSerializer
from usuario_modulo.models import *


def recursive_menu(request):
    if request.is_secure():
        scheme = 'https://'
    else:
        scheme = 'http://'

    base_url = scheme + request.get_host()
    menu = None
    modulo_id = None
    if 'menu' in request.session:
        menu = request.session['menu']
    else:
        menu = None
    if 'MODULO_ID' in request.session:
        modulo_id = request.session['MODULO_ID']

    menu = ReadModuloSerializer(
        instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
            proyectosistema__proyectos_id=1).distinct(),
        many=True).data
    context = {
        "menu": drawSidebar(menu, base_url, modulo_id),
    }

    return {'CLIENT_MENU': context}
