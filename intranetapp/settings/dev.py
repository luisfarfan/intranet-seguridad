from .base import *

SECRET_KEY = 'mthmsr2i5ddl9i44)&=91fn2kjgzr9&kl$$m)12d9lhja_$!_g'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'consecucion': {
        'ENGINE': 'sql_server.pyodbc',
        'NAME': 'INEI_BDRRHH_CONSECUCION',
        'USER': 'rvila',
        'PASSWORD': 'inei1202',
        'HOST': '192.168.200.250',
        'OPTIONS': {
            'driver': 'SQL Server',
            'unicode_results': True,
        },
    },
}
