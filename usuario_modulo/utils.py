from usuario_modulo.serializer import ReadModuloSerializer
from usuario_modulo.models import Modulo


def getMenubyProject(proyecto_id, modulos_id):
    menuResultado = []
    moduloTree = ReadModuloSerializer(
        instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
            proyectosistema__proyectos_id=proyecto_id).distinct(),
        many=True).data
    for modulo in moduloTree:
        if hasChild(modulo, modulos_id):
            menuResultado.append({'id': modulo['id'], 'nombre': modulo['nombre'], 'descripcion': modulo['descripcion'],
                                  'slug': modulo['slug'], 'codigo': modulo['codigo'], 'icon': modulo['icon'],
                                  'is_padre': modulo['is_padre'], 'modulo_padre': modulo['modulo_padre'],
                                  'modulos_hijos': []})
            pos = len(menuResultado) - 1
            if len(modulo['modulos_hijos']):
                for child in modulo['modulos_hijos']:
                    if hasChild(child,modulos_id):
                        menuResultado[pos]['modulos_hijos'].append({})


def hasChild(moduloTree, modulos_id):
    has_child = False
    count = 0
    if moduloTree['id'] in modulos_id:
        count = count + 1
    else:
        if len(moduloTree['modulos_hijos']):
            for modulo in moduloTree:
                has_child(modulo, modulos_id)

    return count > 0


"""
function findChilds(menu: IModulo, rol_id_array: Array<number>): boolean {
    let has_child: boolean = false;
    let count: number = 0;
    if (rol_id_array.indexOf(menu.id) != -1) {
        count++;
    } else {
        if (menu.modulos_hijos.length) {
            menu.modulos_hijos.map((value: IModulo, key: number) => {
                if (rol_id_array.indexOf(value.id) != -1) {
                    count++;
                } else {
                    findChilds(value, rol_id_array);
                }
            });
        }
    }

    return has_child = count > 0;
}

"""
