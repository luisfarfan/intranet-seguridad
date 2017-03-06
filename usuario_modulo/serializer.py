from .models import *
from rest_framework import serializers


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class CrudModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = ('__all__')


class ReadModuloSerializer(serializers.ModelSerializer):
    modulos_hijos = RecursiveSerializer(many=True, read_only=True)

    class Meta:
        model = Modulo
        fields = ('__all__')


class _ReadModuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modulo
        fields = ('__all__')


class CrudPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permiso
        fields = ('__all__')


class ReadModuloRolSerializer(serializers.ModelSerializer):
    # permisos = CrudPermisoSerializer(many=True, read_only=True)
    modulo = ReadModuloSerializer()

    class Meta:
        model = ModuloRol
        fields = ('__all__')


class ReadModuloRolbymodulorolSerializer(serializers.ModelSerializer):
    modulo = _ReadModuloSerializer()
    permisos = CrudPermisoSerializer(many=True, read_only=True)

    class Meta:
        model = ModuloRol
        fields = ('__all__')


class CrudRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('__all__')


class ReadRolSerializer(serializers.ModelSerializer):
    # modulo_rol = serializers.PrimaryKeyRelatedField(many=True,read_only=True)
    modulo_rol = ReadModuloRolSerializer(many=True)

    class Meta:
        model = Rol
        fields = ('__all__')


class ReadModuloRolPermisosSerializer(serializers.ModelSerializer):
    modulorol = ReadModuloRolSerializer()

    class Meta:
        model = ModuloRolPermisos
        fields = ('__all__')


class CrudModuloRolPermisosSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuloRolPermisos
        fields = ('__all__')


class CrudModuloRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModuloRol
        fields = ('__all__')
