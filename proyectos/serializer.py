from .models import *
from rest_framework import serializers


class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ('__all__')


class SistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sistema
        fields = ('__all__')


class SistemasxProyectoSerializer(serializers.ModelSerializer):
    sistemas = SistemaSerializer(many=True, read_only=True)

    class Meta:
        model = Proyecto
        fields = ('__all__')


class ProyectosSistemasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoSistema
        fields = ('__all__')
