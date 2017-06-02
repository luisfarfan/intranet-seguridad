from .base import *

SO = 'LINUX'  # WINDOWS | LINUX
if SO == 'LINUX':
    DRIVER = 'ODBC Driver 11 for SQL Server'
elif SO == 'WINDOWS':
    DRIVER = 'SQL Server'

DATABASES = {
    # BASE DE DATOS PRINCIPAL DE SEGURIDAD
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    # BASE DE DATOS DONDE SE OBTIENE LA LISTA DE PROYECTOS DE INEI
    'consecucion': {
        'ENGINE': 'sql_server.pyodbc',  # Driver de sql para python
        'NAME': 'xxxxxxx',  # Nombre de Base de Datos
        'USER': 'xxxxxx',  # Usuario de Base de datos
        'PASSWORD': 'xxxx',  # clave de Base de Datos
        'HOST': 'xxx.xx.xxx',  # HOST del servidor
        'OPTIONS': {
            'driver': DRIVER,
            'unicode_results': True
        },
    },
}
