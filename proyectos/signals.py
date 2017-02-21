from django.db.models.signals import post_save
from django.dispatch import receiver
from usuario_modulo.models import Modulo
from proyectos.models import ProyectoSistema
from django.utils.text import slugify

print('hola1')


def saveProyectoSistema(sender, **kwargs):
    print('hola')
    instance = kwargs['instance']
    modulo = Modulo(proyectosistema=instance, nombre=instance.sistemas.nombre,
                    descripcion=instance.sistemas.descripcion,
                    slug=slugify(instance.sistemas.nombre), codigo=slugify(instance.sistemas.nombre), is_padre=1)
    modulo.save()


post_save.connect(saveProyectoSistema, sender=ProyectoSistema)
