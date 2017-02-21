class Menu:
    def drawSidebar(menu, base_url, module_id):
        if menu is None:
            return ''
        html = ''
        html += """<li class="navigation-header"><span>Censo de Poblacion y Vivienda VIII</span>
                 <i class="icon-menu" title="Main pages"></i></li>"""
        html += Menu.recursiveMenu(menu, base_url, module_id)
        return html

    def recursiveMenu(menu, base_url, module_id):
        html = ''
        css_class = ''
        for i in menu:
            if i['modulos_hijos'].__len__:
                if module_id == i['id']:
                    css_class = """class='active'"""
                else:
                    css_class = ''
                html += """<li {}><a href="#"><i class="{}"></i> <span>{}</span></a><ul>""".format(css_class, i['icon'],
                                                                                                   i['descripcion'])
                for child in i['modulos_hijos']:
                    if module_id == child['id']:
                        css_class = """class='active'"""
                    else:
                        css_class = ''
                    html += """<li {}><a href = "{}"><i class ="{}"></i> {}</a></li>""".format(css_class,
                                                                                               base_url + '/' + child[
                                                                                                   'slug'] + '/',
                                                                                               child['icon'],
                                                                                               child['descripcion'])
                    html += Menu.recursiveMenu(child['modulos_hijos'], base_url, module_id)
                html += """</ul>"""
            else:
                html += """<li {}><a href="{}"><i class="{}"></i> <span>{}</span></a></li>""".format(css_class,
                                                                                                     base_url + '/' +
                                                                                                     child[
                                                                                                         'slug'] + '/',
                                                                                                     child['icon'],
                                                                                                     child[
                                                                                                         'descripcion'])
        return html
