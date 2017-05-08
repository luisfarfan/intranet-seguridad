from django.db import models


# Create your models here.
class TipoVariable(models.Model):
    nombre = models.CharField(max_length=20)

    class Meta:
        managed = True
        db_table = 'TIPOVARIABLES'


class Parameter(models.Model):
    nombre = models.CharField(max_length=20)
    descripcion = models.TextField()
    tipovariable = models.ForeignKey(TipoVariable)
    parameterexample = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        managed = True
        db_table = 'PARAMETERS'


class WebService(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    httpmethod = models.CharField(max_length=20)
    parameters = models.ManyToManyField(Parameter, through='WebServiceParameters')
    url = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        managed = True
        db_table = 'WEBSERVICES'


class WebServiceParameters(models.Model):
    webservice = models.ForeignKey(WebService)
    parameter = models.ForeignKey(Parameter)

    class Meta:
        managed = True
        db_table = 'WEBSERVICE_PARAMETERS'
