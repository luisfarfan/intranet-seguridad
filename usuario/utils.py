def drawSidebar(menu, base_url, module_id):
    if menu is None:
        return ''
    html = ''
    html += """<li class="navigation-header"><span>Censo de Poblacion y Vivienda VIII</span>
                 <i class="icon-menu" title="Main pages"></i></li>"""
    html += recursiveMenu(menu, base_url, module_id)
    print(html)
    return html


def recursiveMenu(menu, base_url, module_id):
    html = ''
    css_class = ''
    for i in menu:
        if len(i['modulos_hijos']):
            if module_id == i['id']:
                css_class = """class='active'"""
            else:
                css_class = ''

            html += """<li {}><a href="#"><i class="{}"></i><span>{}</span></a><ul> """.format(css_class, i['icon'],
                                                                                               i['descripcion'])
            for child in i['modulos_hijos']:
                if module_id == child['id']:
                    css_class = """class='active'"""
                else:
                    css_class = ''

                if len(child['modulos_hijos']):
                    html += """<li {}><a href="{}"><i class ="{}">
                        </i>{}</a><ul>""".format(css_class, base_url + '/' + child['slug'] + '/', child['icon'],
                                                 child['descripcion'])
                    html += recursiveMenu(child['modulos_hijos'], base_url, module_id)
                    html += """</ul>"""
                else:
                    html += """<li {}><a href="{}"><i class ="{}">
                                        </i>{}</a>""".format(css_class, base_url + '/' + child['slug'] + '/',
                                                             child['icon'],
                                                             child['descripcion'])
            html += """</ul>"""
        else:
            html += """<li {}><a href="{}">
                <i class="{}"></i><span>{}</span></a></li>""".format(css_class, base_url + '/' + i['slug'] + '/',
                                                                     i['icon'], i['descripcion'])
    return html


def getMenuRol(menu, rol_id_array):
    menu_rol = []

    for parent in menu:
        if findChilds(parent, rol_id_array):
            _modulo = {}
            _modulo['id'] = parent['id']
            _modulo['nombre'] = parent['nombre']
            _modulo['descripcion'] = parent['descripcion']
            _modulo['slug'] = parent['slug']
            _modulo['modulos_hijos'] = []
            menu_rol.append(_modulo)
            pos = len(menu_rol) - 1
            for modulo in parent['modulos_hijos']:
                if findChilds(modulo, rol_id_array):
                    menu_rol[pos]['modulos_hijos'].append(modulo)
    return menu_rol


def findChilds(menu, rol_id_array):
    count = 0
    if menu['id'] in rol_id_array:
        count = count + 1
    else:
        if len(menu['modulos_hijos']):
            for modulo in menu['modulos_hijos']:
                if modulo['id'] in rol_id_array:
                    count = count + 1
                else:
                    findChilds(modulo, rol_id_array)

    has_child = count > 0
    return has_child
    # return has_child = count > 0;
