from .models import *
from rest_framework import serializers
from usuario_modulo.serializer import CrudRolSerializer


# class ModuloRolPermisosUsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ModuloRolPermisosUsuario
#         fields = '__all__'


class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = ('id', 'nombre', 'descripcion',)


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'


class UsuarioDetalleSerializer(serializers.ModelSerializer):
    rol = CrudRolSerializer(read_only=True)
    tipousuario = TipoUsuarioSerializer(read_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'


class UsuariosOnlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosOnline
        fields = ('__all__')
