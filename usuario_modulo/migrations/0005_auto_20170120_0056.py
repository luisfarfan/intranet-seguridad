# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-20 05:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuario_modulo', '0004_auto_20170119_2304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modulo',
            name='modulo_padre',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='modulos_hijos', to='usuario_modulo.Modulo'),
        ),
    ]
