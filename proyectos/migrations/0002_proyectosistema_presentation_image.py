# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-10 23:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('proyectos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='proyectosistema',
            name='presentation_image',
            field=models.FileField(blank=True, default='', upload_to=''),
        ),
    ]