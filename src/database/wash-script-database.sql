-- 1. Crear base de datos
CREATE DATABASE whashapp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

-- 2. Crear las tablas
-- 2.1 Tabla clientes
CREATE TABLE public.clientes
(
    id serial NOT NULL,
    nombre text NOT NULL,
    apellidos text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE IF EXISTS public.clientes
    OWNER to postgres;

-- 2.2 Tabla lavadores
CREATE TABLE public.lavadores
(
    id serial NOT NULL,
    nombre text NOT NULL,
    apellido text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
)
WITH (
    OIDS = FALSE
);

-- 2.3 Tabla Lavadores
CREATE TABLE public.solicitudes
(
    id serial NOT NULL,
    "idCliente" serial NOT NULL,
    "idLavador" serial,
    "fechaSolicitud" date NOT NULL,
    "fechaLavado" date NOT NULL,
    estado text NOT NULL,
    PRIMARY KEY ("idCliente"),
    CONSTRAINT "fkCliente" FOREIGN KEY ("idCliente")
        REFERENCES public.clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fkLavador" FOREIGN KEY ("idLavador")
        REFERENCES public.lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
);

-- 2.4 Tabla lavadores
CREATE TABLE public.calificaciones
(
    id serial NOT NULL,
    "idCliente" serial NOT NULL,
    "idLavador" serial NOT NULL,
    "fechaCreacion" date NOT NULL,
    calificacion numeric NOT NULL,
    PRIMARY KEY ("idCliente"),
    CONSTRAINT "fkCliente" FOREIGN KEY ("idCliente")
        REFERENCES public.clientes (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "fkLavador" FOREIGN KEY ("idLavador")
        REFERENCES public.lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
);


-- 2.5 Tabla horarios
CREATE TABLE public.horarios
(
    id serial NOT NULL,
    "idLavador" serial NOT NULL,
    "horaInicial" date NOT NULL,
    "horaFinal" date NOT NULL,
    PRIMARY KEY ("idLavador"),
    CONSTRAINT "fkLavador" FOREIGN KEY ("idLavador")
        REFERENCES public.lavadores (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)
WITH (
    OIDS = FALSE
);