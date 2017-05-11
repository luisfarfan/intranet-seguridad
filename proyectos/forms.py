from django import forms

from .models import ProyectoSistema


class ProyectoSistemaForm(forms.ModelForm):
    class Meta:
        model = ProyectoSistema
        fields = ('__all__')
