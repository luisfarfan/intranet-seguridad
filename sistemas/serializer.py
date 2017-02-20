from .models import *
from rest_framework import serializers


class SistemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sistema
        fields = ('__all__')
