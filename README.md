# helloworld

CREATE ROLE helloworldowner WITH
  LOGIN
   PASSWORD 'supersecretpassword';

CREATE DATABASE helloworld
    WITH
    OWNER = helloworldowner;

CREATE TABLE IF NOT EXISTS public.users
(
    name text COLLATE pg_catalog."default" NOT NULL,
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    age integer,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_age_check CHECK (age >= 0 AND age <= 130)
)

ALTER TABLE IF EXISTS public.users
    OWNER to helloworldowner;

CREATE UNIQUE INDEX users_name_idx
    ON public.users  ( name );
    

Environmentvariabler plasseres i env.sh
export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=helloworld
export PGUSER=helloworldowner
export PGPASSWORD=supersecretpassword


# oppdatere til ny versjon
npm install -g npm-check-update
# sjekk og oppdater package.json
ncu
# oppdater pakker
ncu -u
