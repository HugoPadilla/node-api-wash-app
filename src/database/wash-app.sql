CREATE TABLE IF NOT EXISTS clientes
(
    id serial PRIMARY KEY NOT NULL,
    nombre text NOT NULL,
    apellidos text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    roll text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS lavadores
(
    id serial PRIMARY KEY NOT NULL,
    nombre text NOT NULL,
    apellidos text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    roll text NOT NULL,
    status text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS solicitudes
(
    id serial NOT NULL,
    "id_cliente" serial NOT NULL,
    "id_lavador" serial NULL,
    "fecha_solicitud" date NOT NULL,
    "fecha_lavado" date NOT NULL,
    estado text NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fkCliente" FOREIGN KEY ("id_cliente")
        REFERENCES clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fkLavador" FOREIGN KEY ("id_lavador")
        REFERENCES lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE IF NOT EXISTS calificaciones
(
    id serial NOT NULL,
    "id_cliente" serial NOT NULL,
    "id_lavador" serial NOT NULL,
    "fecha_creacion" date NOT NULL,
    calificacion numeric NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fkCliente" FOREIGN KEY ("id_cliente")
        REFERENCES clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fkLavador" FOREIGN KEY ("id_lavador")
        REFERENCES lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);


CREATE TABLE IF NOT EXISTS horarios
(
    id serial NOT NULL,
    "id_lavador" serial NOT NULL,
    "hora_inicial" date NOT NULL,
    "hora_final" date NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT "fkLavador" FOREIGN KEY ("id_lavador")
        REFERENCES lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

INSERT INTO clientes(id, nombre, apellidos, email, password, roll) 
VALUES (1, 'User', 'Uno', 'uno@test.com', 'user123', 'cliente');
INSERT INTO clientes(id, nombre, apellidos, email, password, roll) 
VALUES (2, 'User', 'Dos', 'dos@test.com', 'user123', 'cliente');
INSERT INTO clientes(id, nombre, apellidos, email, password, roll) 
VALUES (3, 'User', 'Tres', 'tres@test.com', 'user123', 'cliente');
INSERT INTO clientes(id, nombre, apellidos, email, password, roll) 
VALUES (4, 'User', 'Cuatro', 'cuato@test.com', 'user123', 'cliente');
INSERT INTO clientes(id, nombre, apellidos, email, password, roll) 
VALUES (5, 'User', 'Cinco', 'cinco@test.com', 'user123', 'cliente');

INSERT INTO lavadores(id, nombre, apellidos, email, password, roll, status) 
VALUES (1, 'lavador', 'Uno', 'uno@test.com', 'lavador123', 'lavador', 'false');
INSERT INTO lavadores(id, nombre, apellidos, email, password, roll, status) 
VALUES (2, 'lavador', 'Dos', 'dos@test.com', 'lavador123', 'lavador', 'false');
INSERT INTO lavadores(id, nombre, apellidos, email, password, roll, status) 
VALUES (3, 'lavador', 'Tre', 'tres@test.com', 'lavador123', 'lavador', 'false');
INSERT INTO lavadores(id, nombre, apellidos, email, password, roll, status) 
VALUES (4, 'lavador', 'Cuatro', 'cuatro@test.com', 'lavador123', 'lavador', 'false');
INSERT INTO lavadores(id, nombre, apellidos, email, password, roll, status) 
VALUES (5, 'lavador', 'Cinco', 'cinco@test.com', 'lavador123', 'lavador', 'false');

INSERT INTO solicitudes(id_cliente, id_lavador, fecha_solicitud, fecha_lavado, estado) 
VALUES((SELECT id FROM clientes WHERE id = 1), (SELECT id FROM lavadores WHERE id = 1), '2020-07-01', '2020-07-01', 'asignado');
INSERT INTO solicitudes(id_cliente, id_lavador, fecha_solicitud, fecha_lavado, estado) 
VALUES((SELECT id FROM clientes WHERE id = 2), (SELECT id FROM lavadores WHERE id = 2), '2020-07-01', '2020-07-01', 'encurso');
INSERT INTO solicitudes(id_cliente, id_lavador, fecha_solicitud, fecha_lavado, estado) 
VALUES((SELECT id FROM clientes WHERE id = 3), (SELECT id FROM lavadores WHERE id = 3), '2020-07-01', '2020-07-01', 'completado');
INSERT INTO solicitudes(id_cliente, id_lavador, fecha_solicitud, fecha_lavado, estado) 
VALUES((SELECT id FROM clientes WHERE id = 4), NULL, '2020-07-01', '2020-07-01', 'pendiente');

INSERT INTO calificaciones(id_cliente, id_lavador, fecha_creacion, calificacion)
VALUES ((SELECT id FROM clientes WHERE id = 3), (SELECT id FROM lavadores WHERE id = 3), '2022-07-01', 4);