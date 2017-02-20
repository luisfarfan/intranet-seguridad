from django.db import models
from django.contrib import admin
from usuario_modulo.models import ModuloRolPermisos


# Create your models here.

class Usuario(models.Model):
    dni = models.CharField(max_length=8, blank=True, null=True)
    ape_pat = models.CharField(max_length=50, blank=True, null=True)
    ape_mat = models.CharField(max_length=50, blank=True, null=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    tipousuario = models.ForeignKey('TipoUsuario')
    fecha_contrato_inicio = models.DateField()
    fecha_contrato_extended = models.DateField(null=True, blank=True)
    fecha_contrato_fin = models.DateField()
    fecha_nacimiento = models.DateField()
    email_inst = models.CharField(max_length=100, blank=True, null=True)
    email_personal = models.CharField(max_length=100, blank=True, null=True)
    usuario = models.CharField(max_length=50)
    clave = models.CharField(max_length=100)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    modulorolpermisousuario = models.ManyToManyField(ModuloRolPermisos, through='ModuloRolPermisosUsuario',
                                                      related_name='modulorolpermisousuario')

    def __unicode__(self):
        return '%s , %s' % (self.dni, self.nombre)

    class Meta:
        managed = True
        db_table = 'USUARIO'


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('dni', 'nombre')


class TipoUsuario(models.Model):
    nombre = models.CharField(max_length=50, blank=True, null=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s' % (self.nombre)

    class Meta:
        managed = True
        db_table = 'TIPO_USUARIO'


@admin.register(TipoUsuario)
class TipoUsuarioAdmin(admin.ModelAdmin):
    list_display = ('nombre',)


class UsuariosOnline(models.Model):
    token = models.CharField(max_length=255)
    usuarios = models.ForeignKey('Usuario')
    navegador_detalle = models.CharField(max_length=255, blank=True, null=True)
    ip = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'USUARIO_ONLINE'


class ModuloRolPermisosUsuario(models.Model):
    usuario = models.ForeignKey(Usuario)
    modulorolpermisos = models.ForeignKey(ModuloRolPermisos, null=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return '%s , %s' % (self.modulopermisorol, self.usuario)

    class Meta:
        managed = True
        db_table = 'MODULO_ROL_PERMISOS_USUARIO'
        unique_together = (('usuario', 'modulorolpermisos'))


@admin.register(ModuloRolPermisosUsuario)
class ModuloRolPermisosUsuarioAdmin(admin.ModelAdmin):
    list_display = ('modulorolpermisos', 'usuario',)
