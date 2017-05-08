# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-02 23:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyectos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='proyectosistema',
            name='codigo',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='proyectosistema',
            name='nombre_bd',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='proyectosistema',
            name='presentacion_icon',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='proyectosistema',
            name='presentacion_nombre',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='proyectosistema',
            name='servidor_bd',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='proyectosistema',
            name='url_base',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
