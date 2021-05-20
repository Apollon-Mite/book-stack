-- Revert books:init from pg

BEGIN;

DROP TABLE "reader_likes_book", "feedback", "book", "writer", "reader";

COMMIT;
