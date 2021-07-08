# Juego de memoria Simon
Aplicación realizada con el objetivo de realizar un juego básico en javascript repitiendo secuencias y manejando tiempos, utilizar localstore para manejar los datos que se generan y ajax para guardarlos en la base de datos.

* Sin limite de fallos, ni tiempo
* Se puede solicitar repetir la secuencia
* Guardado automatico de puntos
* Ranking de los mejores diez
* Opción de activar/desactivar sonido
* Registro por usuario y correo
* Utilización de flechas del teclado para accionar los botones

Posibles mejoras:
* Cambios y mejoras en el diseño del juego en general

Estado del proyecto: Finalizado.

* Visualizar en línea: https://warika.com.ar/simon/

```
Para juegar es necesario tener activados las cookies, javascript y el sonido.
```

Herramientas utilizadas: PHP, SQL, Javascript, JQuery, AJAX, XAMPP, MySQL WorkBench

```
Script SQL:

CREATE DATABASE `db_simon`;
CREATE TABLE `users_simon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  `email` varchar(50) NOT NULL,
  `points` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
)
```


