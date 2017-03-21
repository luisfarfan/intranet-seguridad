from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from usuario.models import *
from usuario_modulo.models import ModuloRol
from usuario.serializer import *
from usuario_modulo.utils import *
from django.contrib.sessions.models import Session
from proyectos.models import *


class Shared:
    def getDataUser(request):
        if 'key' not in request.GET:
            raise PermissionDenied
        else:
            key = request.GET['key']
            session = Session.objects.filter(pk=key)
            if session.count():
                session = Session.objects.get(pk=key)
                return JsonResponse(session.get_decoded(), safe=False)
            else:
                return JsonResponse({'msg': 'Key no valida'}, safe=False)

    def setSessionUserData(user_id):
        user_data = UsuarioDetalleSerializer(instance=Usuario.objects.all().filter(pk=user_id), many=True).data[0]
        modulos = ModuloRol.objects.filter(rol_id=user_data['rol']['id'])
        modulos_id = modulos.values_list('modulo_id', flat=True)
        modulos_values = Modulo.objects.filter(pk__in=modulos_id).values()
        modulos_parentChild = getMenubyProject(getRecursiveMenu(1), list(modulos_id))

        response = {
            'user_data': user_data,
            'modulos': {
                'CPV': {
                    'menu': modulos_parentChild,
                    'modulos_individuales': list(modulos_values)
                }
            },
        }
        return response

    def authentication(request):
        if request.method == 'POST':
            usuario = request.POST['usuario']
            clave = request.POST['clave']
            valid_user = Usuario.objects.filter(usuario=usuario, clave=clave)
            if valid_user.count():
                user = Usuario.objects.get(usuario=usuario, clave=clave)
                request.session['data'] = Shared.setSessionUserData(user.id)
                if not request.session.session_key:
                    request.session.save()

                if ModuloRol.objects.filter(rol_id=user.rol_id, modulo__proyectosistema__sistemas_id=2).count():
                    return JsonResponse({'session': True, 'key': request.session.session_key, 'is_udra': True})
                else:
                    return JsonResponse({'session': True, 'key': request.session.session_key, 'is_udra': False})
            else:
                return JsonResponse({'session': False})
        else:
            raise PermissionDenied


def getUsuariosporProyectoSistema(request, proyecto, sistema):
    proyectosistema = ProyectoSistema.objects.filter(sistemas__codigo=sistema, proyectos__sigla=proyecto)

    if proyectosistema:
        proyectoSistema = ProyectoSistema.objects.get(sistemas__codigo=sistema, proyectos__sigla=proyecto)
        roles = Rol.objects.filter(modulo__proyectosistema_id=proyectoSistema.id).values_list('id', flat=True)
        usuarios = Usuario.objects.filter(rol_id__in=roles).values()
    else:
        return JsonResponse({'msg': 'No existe'})

    return JsonResponse(list(usuarios), safe=False)


def getUsuariosporProyectoSistemaFilterRol(request, proyecto, sistema, rol_codigo):
    proyectosistema = ProyectoSistema.objects.filter(sistemas__codigo=sistema, proyectos__sigla=proyecto)

    if proyectosistema:
        proyectoSistema = ProyectoSistema.objects.get(sistemas__codigo=sistema, proyectos__sigla=proyecto)
        roles = Rol.objects.filter(modulo__proyectosistema_id=proyectoSistema.id, id=rol_codigo).values_list('id',
                                                                                                             flat=True)
        usuarios = Usuario.objects.filter(rol_id__in=roles).values()
    else:
        return JsonResponse({'msg': 'No existe'})

    return JsonResponse(list(usuarios), safe=False)
