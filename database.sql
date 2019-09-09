
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "clearance" INTEGER NOT NULL DEFAULT '1'
);

CREATE TABLE "locations"
(
    "id" SERIAL PRIMARY KEY,
    "location_name" VARCHAR(100) NOT NULL,
    "number_street" varchar(50) NOT NULL,
    "city" varchar(50) NOT NULL,
    "state" varchar(50) NOT NULL,
    "zip_code" varchar(50) NOT NULL
);

CREATE TABLE "events"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "location_id" integer REFERENCES "location",
    "date" DATE NOT NULL,
    "creator_id" integer REFERENCES "user",
    "time_doors" VARCHAR(8) NOT NULL,
    "time_show" VARCHAR(8) NOT NULL
);


CREATE TABLE "bands"
(
    "id" SERIAL PRIMARY KEY,
    "band_name" VARCHAR(255) NOT NULL
);


CREATE TABLE "band_event"
(
    "id" SERIAL PRIMARY KEY,
    "band_id" integer REFERENCES "bands",
    "event_id" integer REFERENCES "events"
);

CREATE TABLE "user_event"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "event_id" INTEGER REFERENCES "events"
);

CREATE TABLE "music"
(
    "id" SERIAL PRIMARY KEY,
    "band_id" integer REFERENCES "bands",
    "url" varchar(255) NOT NULL
);


INSERT INTO "user"
VALUES
    ('1', 'andy', '123', '1');

INSERT INTO "locations"
VALUES
    ('1', 'cabooze', '913 Cedar Ave', 'Minneapolis', 'MN', '55404');

INSERT INTO "events"
VALUES
    ('1', '1', '2019-10-31', '1', '8:00', '9:00');

INSERT INTO "bands"
VALUES
    ('1', 'Wookiefoot');

INSERT INTO "band_event"
VALUES
    ('1', '1', '1');

INSERT INTO "user_event"
VALUES
    ('1', '1', '1');



