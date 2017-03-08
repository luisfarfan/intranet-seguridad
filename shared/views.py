from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from usuario.models import *
from usuario.serializer import *


class Shared:
    def getDataUser(request, user_id):
        if 'key' not in request.GET:
            raise PermissionDenied

        user_data = UsuarioSerializer(instance=Usuario.objects.all().filter(pk=user_id), many=True).data
        


        response = {
            'informacion_usuario': user_data,
            'modulo_recursive': [],
        }
        return JsonResponse(response, safe=False)
