from django.db import models
from sistemas.models import Sistema
from django.contrib import admin


class Proyecto(models.Model):
    id_siga = models.IntegerField()
    nombre = models.CharField(max_length=100)
    sigla = models.CharField(max_length=50, null=True, blank=True)
    anio = models.IntegerField()
    descripcion = models.TextField(blank=True, null=True)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_fin = models.DateField(blank=True, null=True)
    cod_meta = models.CharField(max_length=8)
    estado = models.IntegerField(default=1)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    sistemas = models.ManyToManyField(Sistema, through='ProyectoSistema')

    def __unicode__(self):
        return '%s , %s' % (self.sigla, self.nombre)

    class Meta:
        managed = True
        db_table = 'PROYECTO'
        unique_together = (('id_siga',))


@admin.register(Proyecto)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('sigla', 'nombre')


class ProyectoSistema(models.Model):
    proyectos = models.ForeignKey('Proyecto')
    sistemas = models.ForeignKey(Sistema)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return '%s , %s' % (self.proyectos, self.sistemas)

    class Meta:
        managed = True
        db_table = 'PROYECTO_SISTEMA'
        unique_together = (('proyectos', 'sistemas'))


@admin.register(ProyectoSistema)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('proyectos', 'sistemas')


class ProyectosSiga(models.Model):
    id = models.IntegerField(primary_key=True, db_column='id')
    annio_meta = models.CharField(db_column='annio_meta', max_length=4, blank=True, null=True)
    codi_meta = models.CharField(db_column='codi_meta', max_length=4, blank=True, null=True)
    cod_proyecto = models.CharField(db_column='cod_proyecto', max_length=4, blank=True, null=True)
    desc_proyecto = models.CharField(db_column='desc_proyecto', max_length=255, blank=True, null=True)
    CODI_DEPE_TDE = models.CharField(db_column='CODI_DEPE_TDE', max_length=4, blank=True, null=True)
    codi_depe_apro = models.CharField(db_column='codi_depe_apro', max_length=4, blank=True, null=True)
    sigla = models.CharField(db_column='sigla', max_length=50, blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.codi_meta, self.desc_proyecto)

    class Meta:
        managed = False
        db_table = 'V_PROYECTOS_SIGA'
