from .models import *
from rest_framework import serializers
from usuario_modulo.serializer import ModuloRolPermisosSerializer


class ModuloRolPermisosUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuloRolPermisosUsuario
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    modulorolpermisousuario = ModuloRolPermisosSerializer(many=True,read_only=True)

    class Meta:
        model = Usuario
        fields = '__all__'


class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = ('__all__')


class UsuariosOnlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuariosOnline
        fields = ('__all__')
