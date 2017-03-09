from usuario_modulo.serializer import ReadModuloSerializer
from usuario_modulo.models import Modulo


def getRecursiveMenu(proyecto_id):
    return ReadModuloSerializer(
        instance=Modulo.objects.exclude(proyectosistema__isnull=True).filter(
            proyectosistema__proyectos_id=proyecto_id).distinct(),
        many=True).data


def getMenubyProject(recursiveMenu, modulos_id):
    _moduloTree = recursiveMenu
    for modulo in _moduloTree:
        index = _moduloTree.index(modulo)
        if hasChild(modulo, modulos_id):
            for mod in modulo['modulos_hijos']:
                index2 = _moduloTree[index]['modulos_hijos'].index(mod)
                if hasChild(mod, modulos_id):
                    getMenubyProject(mod['modulos_hijos'], modulos_id)
                else:
                    _moduloTree[index]['modulos_hijos'][index2] = []
        else:
            _moduloTree[index] = []

    # return clearEmptyArrays(_moduloTree)
    return _moduloTree


def clearEmptyArrays(recursiveMenu):
    hay = 0
    nohay = 0
    for index, modulo in enumerate(recursiveMenu):
        if len(modulo) == 0:
            recursiveMenu.remove(modulo)
            nohay = nohay + 1
        else:
            if nohay > 0:
                hay = hay + 1
            index = hay
            print(recursiveMenu['id'])
            for ind, child in enumerate(recursiveMenu[index]['modulos_hijos']):
                if len(recursiveMenu[index]['modulos_hijos'][ind]) == 0:
                    recursiveMenu[index]['modulos_hijos'].remove(child)
                else:
                    clearEmptyArrays(recursiveMenu[index]['modulos_hijos'][ind])

    return recursiveMenu


def hasChild(moduloTree, modulos_id):
    count = 0
    if moduloTree['id'] in modulos_id:
        count = count + 1
    else:
        if len(moduloTree['modulos_hijos']):
            for modulo in moduloTree['modulos_hijos']:
                if modulo['id'] in modulos_id:
                    count = count + 1
                else:
                    hasChild(modulo, modulos_id)

    return count > 0
