from django.db import models
from proyectos.models import ProyectoSistema
from django.contrib import admin


# Create your models here.
class Modulo(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    slug = models.CharField(max_length=50)
    codigo = models.CharField(max_length=8)
    proyectosistema = models.ForeignKey(ProyectoSistema, null=True, blank=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    modulo_padre = models.ForeignKey('self', related_name='modulos_hijos', null=True, blank=True)
    template_html = models.CharField(max_length=255, null=True)
    is_padre = models.IntegerField(default=0)
    icon = models.CharField(max_length=100, default='icon-home4')
    roles = models.ManyToManyField('Rol', through='ModuloRol')

    def __unicode__(self):
        return '%s , %s' % (self.codigo, self.nombre)

    class Meta:
        managed = True
        db_table = 'MODULO'


@admin.register(Modulo)
class ModuloAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre',)


class Permiso(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    codigo = models.CharField(max_length=8)
    dom_name_sufijo = models.CharField(max_length=100)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.codigo, self.nombre)

    class Meta:
        managed = True
        db_table = 'PERMISO'


@admin.register(Permiso)
class PermisoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre',)


class ModuloRol(models.Model):
    rol = models.ForeignKey('Rol', related_name='modulo_rol')
    modulo = models.ForeignKey('Modulo')
    permisos = models.ManyToManyField('Permiso', through='ModuloRolPermisos')
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.permiso, self.modulo)

    class Meta:
        managed = True
        db_table = 'MODULO_ROL'
        unique_together = (('rol', 'modulo'))


@admin.register(ModuloRol)
class ModuloRolAdmin(admin.ModelAdmin):
    list_display = ('rol', 'modulo',)


class Rol(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    codigo = models.CharField(max_length=8, null=True, blank=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.codigo, self.nombre)

    class Meta:
        managed = True
        db_table = 'ROL'


@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre',)


class ModuloRolPermisos(models.Model):
    modulorol = models.ForeignKey('ModuloRol', null=True)
    permisos = models.ForeignKey('Permiso', null=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.modulorol, self.permisos)

    class Meta:
        managed = True
        db_table = 'MODULO_ROL_PERMISOS'
        unique_together = (('modulorol', 'permisos'))


@admin.register(ModuloRolPermisos)
class ModuloRolPermisosAdmin(admin.ModelAdmin):
    list_display = ('modulorol', 'permisos',)
