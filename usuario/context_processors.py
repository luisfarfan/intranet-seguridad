# -*- coding: utf-8 -*-
from usuario.utils import Menu


def recursive_menu(request):
    if request.is_secure():
        scheme = 'https://'
    else:
        scheme = 'http://'

    base_url = scheme + request.get_host()
    context = {
        "menu": Menu.drawSidebar(request.session['menu'], base_url, request.session['MODULO_ID'])
    }

    return {'CLIENT_MENU': context}
