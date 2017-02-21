from usuario_modulo.models import Modulo
from django.utils.text import slugify


def saveProyectoSistema(model):
    modulo = Modulo(proyectosistema=model, nombre=model.sistemas.nombre, descripcion=model.sistemas.descripcion,
                    slug=slugify(model.sistemas.nombre), codigo=slugify(model.sistemas.nombre), is_padre=1)
    modulo.save()
