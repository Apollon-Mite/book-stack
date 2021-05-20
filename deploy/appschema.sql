BEGIN;

DROP TABLE IF EXISTS "reader", "writer", "book", "feedback", "reader_likes_book";

CREATE TABLE "reader" (
  "id" SERIAL PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "writer" (
  "id" SERIAL PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "book" (
  "id" SERIAL PRIMARY KEY,
  "writer_id" INTEGER NOT NULL REFERENCES writer("id"),
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "picture_url" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "feedback" (
  "id" SERIAL PRIMARY KEY,
  "reader_id" INTEGER NOT NULL REFERENCES reader("id"),
  "book_id" INTEGER NOT NULL REFERENCES book("id"),
  "content" TEXT NOT NULL,
  "stars" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);


CREATE TABLE "reader_likes_book" (
  "id" SERIAL PRIMARY KEY,
  "reader_id" INTEGER NOT NULL REFERENCES reader("id"),
  "book_id" INTEGER NOT NULL REFERENCES book("id")
);


INSERT INTO "reader" ("firstname", "lastname", "email", "password")
VALUES ('Luc', 'Rocher', 'luc@gmail.com', 'bonjourLapin'),
       ('Yves', 'Besson', 'yves@gmail.com', 'doraboss'),
       ('Marie', 'Thérèse', 'marie@gmail.com', 'dragonball');


INSERT INTO "writer" ("firstname", "lastname", "email", "password")
VALUES ('Jean', 'DelaFontaine', 'jean@gmail.com', 'bonjourLapin'),
       ('Leonard', 'Devinci', 'leonard@gmail.com', 'doraboss'),
       ('Clara', 'Watson', 'clara@gmail.com', 'dragonball');

INSERT INTO "book" ("writer_id", "title", "description", "picture_url")
VALUES (1, 'Le petit Prince', 'Le voyage du petit prince sur la lune avec ses amis', 'https://products-images.di-static.com/image/antoine-de-saint-exupery-le-petit-prince/9782072431258-475x500-1.webp'),
       (2, 'Harry Potter', 'Le voyage de Harry Potter sur leurs balais avec ses amis', 'https://products-images.di-static.com/image/j-k-rowling-harry-potter-tome-1-harry-potter-a-l-ecole-des-sorciers/9782070624522-475x500-1.webp'),
       (3, 'Lord of the rings', 'Le voyage de Frodon au Mordor avec ses amis', 'https://products-images.di-static.com/image/john-ronald-reuel-tolkien-le-seigneur-des-anneaux-integrale/9782266286268-475x500-1.webp');


INSERT INTO "feedback" ("reader_id", "book_id", "content", "stars")
VALUES (1, 3, 'Super livre même s''il est long', 4),
       (2, 2, 'Très bien pour les enfants', 4),
       (3, 1, 'Excellentes histoires touchantes du petit Prince', 5);

INSERT INTO "reader_likes_book" ("reader_id", "book_id")
VALUES (1, 3),
       (1, 2),
       (1, 3),
       (2, 3),
       (3, 1),
       (1, 2);

COMMIT;