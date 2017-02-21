# -*- coding: utf-8 -*-
from usuario.utils import Menu


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
    context = {
        "menu": Menu.drawSidebar(menu, base_url, modulo_id)
    }

    return {'CLIENT_MENU': context}
