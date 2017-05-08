from .models import *
from rest_framework import serializers


class WebserviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebService
        fields = ('__all__')


class TipoVariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoVariable
        fields = ('__all__')


class ParameterSerializer(serializers.ModelSerializer):
    tipovariable = TipoVariableSerializer()

    class Meta:
        model = Parameter
        fields = ('__all__')


class WebServiceParametersSerializer(serializers.ModelSerializer):
    parameters = ParameterSerializer(many=True, read_only=True)

    class Meta:
        model = WebService
        fields = ('__all__')

# class TipoVariableProyectoSerializer(serializers.ModelSerializer):
#     sistemas = SistemaSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Proyecto
#         fields = ('__all__')
#
#
# class ProyectosSistemasSerializer(serializers.ModelSerializer):
#     sistemas = SistemaSerializer()
#
#     class Meta:
#         model = ProyectoSistema
#         fields = ('__all__')
