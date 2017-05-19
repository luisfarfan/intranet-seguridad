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
    proyectos = models.ForeignKey('Proyecto', on_delete=models.CASCADE)
    sistemas = models.ForeignKey(Sistema, on_delete=models.CASCADE)
    url_base = models.CharField(max_length=100, blank=True, null=True)
    codigo = models.CharField(max_length=20, blank=True, null=True)
    servidor_bd = models.CharField(max_length=100, blank=True, null=True)
    nombre_bd = models.CharField(max_length=100, blank=True, null=True)
    url_receive = models.CharField(max_length=100, blank=True, null=True)
    presentacion_icon = models.CharField(max_length=255, blank=True, null=True)
    presentacion_nombre = models.CharField(max_length=100, blank=True, null=True)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    presentation_image = models.CharField(max_length=255, blank=True, null=True)
    usuarios = models.ManyToManyField('Usuario', through='AdministradoresProyectoSistema')

    # def save(self, *args, **kwargs):
    #     if self.pk is None:
    #         super(ProyectoSistema, self).save(*args, **kwargs)
    #         modulo = Modulo(proyectosistema=self, nombre=self.sistemas.nombre, descripcion=self.sistemas.descripcion,
    #                         slug=slugify(self.sistemas.nombre), codigo=slugify(self.sistemas.nombre), is_padre=1)
    #         modulo.save()
    #     return self

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
        db_table = 'proyectos_siga'


class Modulo(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)
    codigo = models.CharField(max_length=100)
    proyectosistema = models.ForeignKey(ProyectoSistema, null=True, blank=True, on_delete=models.CASCADE)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    modulo_padre = models.ForeignKey('self', related_name='modulos_hijos', null=True, blank=True,
                                     on_delete=models.CASCADE)
    template_html = models.CharField(max_length=255, null=True)
    is_padre = models.IntegerField(default=0)
    icon = models.CharField(max_length=255, default='icon-home4')
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
    codigo = models.IntegerField()
    dom_name_sufijo = models.CharField(max_length=100)
    proyectosistema = models.ForeignKey(ProyectoSistema, null=True, blank=True, on_delete=models.CASCADE)
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
    rol = models.ForeignKey('Rol', related_name='modulo_rol', on_delete=models.CASCADE)
    modulo = models.ForeignKey('Modulo', on_delete=models.CASCADE)
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
    modulorol = models.ForeignKey('ModuloRol', null=True, on_delete=models.CASCADE)
    permisos = models.ForeignKey('Permiso', null=True, on_delete=models.CASCADE)
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


class Usuario(models.Model):
    dni = models.CharField(max_length=8, blank=True, null=True)
    ape_pat = models.CharField(max_length=50, blank=True, null=True)
    ape_mat = models.CharField(max_length=50, blank=True, null=True)
    nombre = models.CharField(max_length=50, blank=True, null=True)
    tipousuario = models.ForeignKey('TipoUsuario')
    fecha_contrato_inicio = models.CharField(max_length=50, null=True, blank=True)
    fecha_contrato_extended = models.CharField(max_length=50, null=True, blank=True)
    fecha_contrato_fin = models.CharField(max_length=50, null=True, blank=True)
    fecha_nacimiento = models.CharField(max_length=50, null=True, blank=True)
    email_inst = models.CharField(max_length=100, blank=True, null=True)
    email_personal = models.CharField(max_length=100, blank=True, null=True)
    usuario = models.CharField(max_length=50)
    clave = models.CharField(max_length=100)
    usr_creacion = models.CharField(max_length=100, blank=True, null=True)
    fec_creacion = models.DateTimeField(blank=True, null=True)
    usr_edicion = models.CharField(max_length=100, blank=True, null=True)
    fec_edicion = models.DateTimeField(blank=True, null=True)
    activo = models.IntegerField(default=1)
    rol = models.ForeignKey(Rol, default=1)
    ccdd = models.CharField(max_length=2, null=True, blank=True)
    ccpp = models.CharField(max_length=2, null=True, blank=True)
    ccdi = models.CharField(max_length=2, null=True, blank=True)
    zona = models.CharField(max_length=5, null=True, blank=True)

    # modulorolpermisousuario = models.ManyToManyField(ModuloRolPermisos, through='ModuloRolPermisosUsuario',
    #                                                  related_name='modulorolpermisousuario')

    def __unicode__(self):
        return '%s , %s' % (self.dni, self.nombre)

    class Meta:
        managed = True
        db_table = 'USUARIO'
        unique_together = ('usuario',)


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


class AdministradoresProyectoSistema(models.Model):
    proyectosistema = models.ForeignKey(ProyectoSistema)
    usuario = models.ForeignKey(Usuario)

    class Meta:
        managed = True
        db_table = 'ADMIN_PROYECTOSISTEMA'
