from django.db import models
from django.contrib import admin


class Sistema(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    codigo = models.CharField(max_length=8)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    estado = models.IntegerField(default=1)

    def __unicode__(self):
        return '%s , %s' % (self.codigo, self.nombre)

    class Meta:
        managed = True
        db_table = 'SISTEMA'


@admin.register(Sistema)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre')
