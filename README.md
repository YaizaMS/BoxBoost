# BoxBoost 💪💚

## Como iniciar el proyecto
Para iniciar el proyecto, debes descargar el proyecto desde la carpeta de descargas y ejecutar el siguiente comando:

- npm install

## Como levantar la aplicación
Para levantar esta aplicacion, debes moverte a la ruta donde tengas descargado el proyecto, recomiendo dividir la terminal en dos, una para el frontend y otra para backend. Luego, en cada terminal, ejecuta los siguientes comandos:

- cd frontend
- npm start

- cd backend
- npm run dev

Para poder conectar con la bbdd es necesario tener instalado la aplicacion docker y configurar  

- docker run -d --name boxboost -e "MYSQL_DATABASE=booxboost" -e "MYSQL_ROOT_PASSWORD=root" -e "MYSQL_USER=root" -e "MYSQL_PASSWORD=root" -p 3306:3306


## Comando de puertos
Estos comandos sirven para ver los puertos abiertos en tu computadora y para 'matarlos' de forma manual.

- netstat -ano | findstr :3000
- taskkill /F /PID  *PID*


## Comandos Angular
Sirven para crear nuevos componentes y servicios

 - ng g c component-name --skip-tests
 - ng g s service-name --skip-tests

## ⛔ CUIDADO ⛔
/!\ No se deben usar los comandos de Angular en el backend, ya que Angular no debe tener dependencias como express, fs, path, mime, http, util

/!\ Angular nunca debe tener dependencias como express, fs, path, mime, http, util


## BBDD
 Cuando aparezca fallo de nonaggregated utilizar estos comandos:

 - set global sql_mode = "";
 - set sql_mode = "";
