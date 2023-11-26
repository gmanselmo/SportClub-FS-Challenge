***********************************************************
******************CHALLENGE SPORT CLUB****************
***********************************************************

# Tecnologías usadas

Backend:
Base de datos: MySQL 11.1.3-MariaDB, client 15.2 for Linux.
Python: 3.11.6.
Python librerias:
    asgiref==3.7.2
    Django==4.2.7
    django-cors-headers==4.3.1
    django-filter==23.4
    mysqlclient==2.2.0
    PyMySQL==1.1.0
    sqlparse==0.4.4

Frontend:
Angular CLI: 16.2.10
Node: 18.18.2
Package Manager: npm 10.2.4
Angular librerias:
    @angular-devkit/architect       0.1602.10
    @angular-devkit/build-angular   16.2.10
    @angular-devkit/core            16.2.10
    @angular-devkit/schematics      16.2.10
    @angular/cli                    16.2.10
    @schematics/angular             16.2.10
    rxjs                            7.8.1
    typescript                      5.1.6
    zone.js                         0.13.3

Softs usados:
Code - OSS (VSCode sin telemetría de Microsoft)
Workbench
Konsole (KDE Terminal)

-----------------------------------------------------------------
EJECUCIÓN PASO A PASO
-----------------------------------------------------------------

# BASE DE DATOS.

Tener instalado MySQL (#REQUISITO)

* Levantarlo en localhost en puerto :3306 (default) (#REQUISITO)

* Crear la Base de datos (#REQUISITO)
CREATE DATABASE sportclubdb;


# PREPARANDO EL ENTORNO DE PYTHON

* Instalar Python (#REQUISITO)
https://www.python.org/downloads/

* Instalar Virtualenviromen, crear uno y activarlo (#RECOMENDADO).
https://virtualenv.pypa.io/en/latest/user_guide.html

* Instalar librerías necesarias** (#REQUISITO)
-Opción 1 ejecutando el archivo de texto requeriments.txt con:
pip install -r requeriments.txt
-Opción 2 ejecutando:
pip install asgiref==3.7.2 Django==4.2.7 django-cors-headers==4.3.1 django-filter==23.4 mysqlclient==2.2.0 PyMySQL==1.1.0 sqlparse==0.4.4

**Esta instalación puede llegar a requerir tener .net framework instalado localmente.
Recomiendo abrir el VsCode e instalar la extensión C# de muhammad-sammy y probar si cumple dependencias antes de instalar otra cosa, ya que esta extensión instala los headers necesarios y en la mayoría de los casos evita tener que instalarlo manualmente desde la web de Microsoft.**


# PREPARANDO EL BACKEND

* Clonar el contenido de la carpeta de Backend Django de este repositorio. Recomiendo colocar su contenido en la misma ruta del virtual enviroment, logrando que el venv y la carpeta src queden paralelos en jerarquía. (#OBLIGATORIO)
/mi_carpeta1/venv
/mi_carpeta1/src

* Setear usuario y contraseña de la DB (#REQUISITO)
En el caso de que tu usuario y contraseña no sean ambas por default ('root), hacerlo en el archivo settings.py ubicado en el directorio src/backsport en la sección de DATABASES = {} en USER Y PASSWORD.

* Hacer las migraciones a la base de datos (#REQUISITO)
Estando en la ruta src/backsport/ ejecutar:
python manage.py migrate
python manage.py makemigrations


# LEVANTAR EL BACKEND

* Levantar el proyecto en localhost puerto 8000 (default) y dejarlo escuchando de fondo (#REQUISITO)
python manage.py runserver


# PREPARANDO EL ENTORNO DE ANGULAR:

*Instalar nodejs y npm** (#REQUISITO)
https://nodejs.org/

* Instalar Angular CLI** (#REQUISITO)
https://angular.io/cli

**En el caso de que algo falle durante su instalación y estar en Windows, abrir la powershell en modo root y correr:
Set-ExecutionPolicy RemoteSigned
Luego reiniciar el sistema e intentar instalar nodejs, npm o Angular Cli de nuevo.**


# PREPARANDO EL FRONTEND

* Clonar el contenido de la carpeta de Frontend Angular de este repositorio donde se desee y hacer posicionarse dentro del directorio Sportclub/ (#REQUISITO)

* Instalar dependencias del proyecto (#REQUISITO)
Estando dentro de Sportclub, en la raís del proyecto de angular ejecutar:
npm install


# LEVANTAR EL FRONTEND

* Correr el proyecto en localhost puerto 4200 (default). Iniciarlo estando en la raíz del proyecto (/Sportclub) con el siguiente comando** (#REQUISITO)
ng serve -o

**Debería abrirse el navegador por defecto automaticamente, sino navegar a http://localhost:4200/**


# CREDENCIALES
User: sportclub
Password: sportclub

## BUGS DETECTADOS: en minimos casos de prueba la busqueda por filtro podría dar fallos en el front, pero funciona bien en el back. Refrescar la página lo soluciona. Si al filtrar por fechas falla con el ingreso manual, hacer click sobre estos debería solucionarlo.


-----------------------------------------------------------------
OTROS.
-----------------------------------------------------------------
Agradecimientos especiales a la gente de SportClub por la oportunidad.


