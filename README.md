<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<!-- <br />
<p align="center">
  <a href="https://github.com/Allz23/repo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">YOUR_TITLE</h3>

  <p align="center">
    YOUR_SHORT_DESCRIPTION
    <br />
    <a href="https://github.com/Allz23/repo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Allz23/repo">View Demo</a>
    ·
    <a href="https://github.com/Allz23/repo/issues">Report Bug</a>
    ·
    <a href="https://github.com/Allz23/repo/issues">Request Feature</a>
  </p>
</p>
 -->

<!-- TABLE OF CONTENTS -->

## Tabla de Contenidos

- [Acerca del proyecto](#acerca-del-proyecto)
  - [Construido con](#construido-con)
- [Empezando](#empezando)
  - [Prerequisitos](#prerequisitos)
  - [Instalación](#instalacion)
- [Licencia](#licencia)
- [Contacto](#contacto)
- [Reconocimientos](#reconocimientos)

<!-- ABOUT THE PROJECT -->

## Acerca del Proyecto

Página web desarrollada para el área de devoluciones de Droguería Nena C.A.

- Usa Express.js como framework Backend y MySQL como base de datos para almacenar los códigos introducidos por los usuarios.
- Emplea una verificación de inicio de sesión para los usuarios usando Passport.js (estrategia local).
- Permite crear, leer y borrar los datos de los usuarios. En función a privilegios de administrador, ciertas caracteristicas (como añadir y borrar usuarios) son restringidas en el sitio.

### Construido con

- [Bootstrap](http://getbootstrap.com/)
- [jQuery](https://jquery.com)
- [Express](https://expressjs.com/es/)

<!-- GETTING STARTED -->

## Empezando

Para obtener una copia local funcional del proyecto siga los siguientes pasos de ejemplo.

### Prerequisitos

Antes que nada, necesitará los siguientes paquetes de software:

- Node.js (> v10)

  Puede obtener la versión más actual del programa en la [pagina oficial](https://nodejs.org/es/).

- MySQL

  Se pueden instalar las herramientas necesarias para el desarrollo con el [MySQL Community Installer](https://dev.mysql.com/downloads/installer/). Tenga en consideración que no todas las herramientas son necesarias, sólo MySQL Server, y el Workbench si se desea un entorno gráfico para manejar la base de datos. También se puede usar el servidor MySQL que viene en el paquete [XAMPP](https://www.apachefriends.org/es/download.html).

- Editor de texto para el desarrollo

  Recomiendo [Visual Studio Code](https://code.visualstudio.com/download) por su excelente integración con Git. Pero cualquier editor sirve.
  
- Git

  Necesitamos instalar el paquete de Git para poder usar los comandos que nos ofrece en nuestro sistema. La version mas reciente se puede descargar de su [página oficial](https://git-scm.com/downloads).

### Instalación

Los comandos que se explican a continuación se ejecutan en la consola de Windows, ya sea _**cmd**_ o _**PowerShell**_, dependiendo de la preferencia del usuario y la configuración de su sistema. 

1. Clone el repositorio en su equipo en el directorio de su preferencia usando el comando:

```sh
git clone https://github.com/Allz23/web-radio-terminal.git
```

2. Instale las dependencias

Una vez haya clonado el repositorio, ubíquese dentro de la carpeta del mismo con el terminal de su sistema operativo y use el comando:

```sh
npm install
```
Otro paso importante a tener en cuenta es el servidor donde vamos a desplegar nuestra página, en éste momento, no disponemos de un servidor LINUX para desplegar, sólo una máquina virtual de Windows, asi que, debemos asegurarnos que nuestro servidor se mantenga corriendo en la máquina virtual como un servicio. Para ello, usaremos el paquete PM2, el cual podemos instalar con el comando:

```sh
npm install pm2@latest -g
```
La bandera "-g" nos indica que el paquete será instalado de manera global en el equipo, y se podrá acceder a sus comandos desde cualquier directorio.

### Iniciando el servicio

Para lograr ésto, debemos saber donde esta localizado el directorio raíz (/src) de nuestra página/app, ubicarnos en el, y localizar el archivo **server.js**, en la terminal usamos los siguientes comandos:

```sh
# Con la bandera '--watch' reiniciaremos la aplicación cada vez que haya algún cambio en el directorio actual + todas las subcarpetas del mismo. Y ademas, ignorará los cambios en el directorio 'node_modules/'.
pm2 start server.js --watch --ignore-watch="node_modules"
```

Algunos comandos útiles de PM2:

```sh
# Modo Fork
pm2 start app.js --name my-api # Darle un nombre al proceso por iniciar.

# Listar

pm2 list               # Muestra el estado de todos los procesos.
pm2 jlist              # Imprime en pantalla todos los procesos en formato JSON crudo.
pm2 prettylist         # Imprime todos los procesos actuales en formato JSON bonito.

# Acciones

pm2 stop all           # Detiene todos los procesos.
pm2 restart all        # reinicia todos los procesos.

pm2 stop 0             # Detiene el proceso con el ID 0
pm2 restart 0          # Reinicia el proceso con el ID 0

pm2 delete 0           # Elimina el proceso con el ID 0
pm2 delete all         # Elimina todos los procesos de la lista de PM2
```
Para mayor información acerca de PM2 puede dirigirse a la [documentación oficial](https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

#### Acerca del archivo *.env-sample*

Los archivos *.env* nos ayudan para poder desplegar nuestras aplicaciones en distintos entornos (servidores, PCs personales de prueba, etc.). Antes de desplegar, o realizar pruebas con el código, asegurese de modificar las variables de entorno contenidas en éste archivo a las correspondientes a su sistema, luego de hacerlo, cambie el nombre del archivo a _**.env**_, dado que el paquete **dotenv** tratará de ubicar un archivo con ése nombre. 

  #### IMPORTANTE
Si se desea desplegar la página usando el paquete _**pm2**_, la ubicación del archivo _.env_ debe cambiarse al directorio raíz      (mover el archivo a la carpeta **src/**). 

<!-- LICENSE -->

## Licencia

Distribuido bajo la licencia MIT. Vea `LICENSE` para mayor información.

<!-- CONTACT -->

## Contacto

Jacinto Acosta - jacintoac24@gmail.com

Link del proyecto: [https://github.com/Allz23/web-radio-terminal](https://github.com/Allz23/web-radio-terminal)

<!-- ACKNOWLEDGEMENTS -->

## Reconocimientos

- [Font Awesome](https://fontawesome.com)
- [Material Design Bootstrap](https://mdbootstrap.com/docs/jquery/getting-started/download/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
- [TableExport](https://tableexport.v5.travismclarke.com/)
