from usuario_modulo.models import Modulo


def getBreadcumbs(id):
    breadcumbs_list = []
    main_modulo = Modulo.objects.get(pk=id)
    breadcumbs_html = ''
    breadcumbs_list.append(main_modulo.nombre)
    if main_modulo.modulo_padre_id is not None:
        parent_modulo = Modulo.objects.get(pk=main_modulo.modulo_padre_id)
        breadcumbs_list.append(parent_modulo.nombre)
        if parent_modulo.modulo_padre_id is not None:
            breadcumbs_list.append(getBreadcumbs(parent_modulo.id))

    reverse = list(reversed(breadcumbs_list))
    for k, v in enumerate(reverse):
        if k == 0:
            breadcumbs_html += '<span class="text-semibold">{}</span>'.format(v)
        else:
            breadcumbs_html += ' - {}'.format(v)

    return breadcumbs_html
