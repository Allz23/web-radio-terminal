-- Guardaremos la sintaxis usada en mySQL para crear la base de datos, y darle sus caracteristicas.
CREATE DATABASE DB_Distribucion;

USE DATABASE db_distribucion;

CREATE TABLE `db_distribucion`.`usuarios` (
  `id_usuarios` INT NOT NULL AUTO_INCREMENT,
  `cedula` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuarios`))
COMMENT = 'Tabla donde se almacenará la informacion correspondiente a los usuarios del sistema.';

CREATE TABLE `db_distribucion`.`sesiones` (
  `id_sesion` INT NOT NULL AUTO_INCREMENT,
  `comentario` VARCHAR(45) NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_sesion`),
  INDEX `sesiones_por_usaurio_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `sesiones_por_usaurio`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_distribucion`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Cada usuario que inicie sesion en la pagina se le asignará una sesion unica, y la guardaremos en esta tabla.';

CREATE TABLE `db_distribucion`.`cubetas` (
  `id_cubeta` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(12) NOT NULL,
  `escaneado en` DATETIME NOT NULL DEFAULT current_timestamp,
  `id_usuario` INT NOT NULL,
  `id_sesion` INT NOT NULL,
  PRIMARY KEY (`id_cubeta`),
  INDEX `cubeta_por_usuario_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `cubeta_por_sesion_idx` (`id_sesion` ASC) VISIBLE,
  CONSTRAINT `cubeta_por_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `db_distribucion`.`usuarios` (`id_usuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `cubeta_por_sesion`
    FOREIGN KEY (`id_sesion`)
    REFERENCES `db_distribucion`.`sesiones` (`id_sesion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'Tabla para los datos relevantes de las cubetas escaneadas.';

INSERT INTO `db_distribucion`.`usuarios` (`id_usuarios`, `cedula`, `nombre`, `apellido`) VALUES ('1', '24247120', 'Jacinto', 'Acosta');

-- La siguiente sintaxis permite unir las columnas de dos tablas en las cuales se compruebe como verdadera una condiconal conocida como 'JOIN_CONDITION'
/* 
  - Si nos fijamos, la 'u' viene siendo una variable que representa la tabla usuarios, declarada en donde se nombre la tabla. Al igual que la 'c'.
  - Cuando usamos la sintaxis, 'u.id_usuario id', le estamos dando un nombre a la columna que obtendremos despues de unir las tablas.

 */
SELECT u.nombre, u.apellido, u.cedula, u.id_usuario id, c.codigo, c.escaneado_en, c.id_usuario id FROM usuarios u 
	INNER JOIN cubetas c 
	ON u.id_usuario = u.id_usuario;

  -- Tambien podemos unir muchas tablas especificando varias condiciones
  SELECT u.nombre, u.apellido, u.cedula, c.codigo, c.escaneado_en, s.id_sesion FROM usuarios u
	INNER JOIN cubetas c 
	ON u.id_usuario = u.id_usuario
    INNER JOIN sesiones s
    ON u.id_usuario = s.id_usuario;

-- Ahora, si necesitamos añadirle otra condicion aparte a la consulta, usamos 'WHERE'. Se puede uasr 'USING' dado que el nombre de las columnas es el mismo.
SELECT u.nombre, u.apellido, u.cedula, c.codigo, c.escaneado_en, s.id_sesion FROM usuarios u
	INNER JOIN cubetas c 
		USING (id_usuario)
  INNER JOIN sesiones s
		USING (id_sesion)
     WHERE id_sesion = 1