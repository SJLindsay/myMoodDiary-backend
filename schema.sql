-- DROP DATABASE IF EXISTS moodtracker;
-- CREATE DATABASE moodtracker;
-- USE moodtracker;

-- CREATE TABLE moods (
--   id integer PRIMARY KEY AUTO_INCREMENT,
--   notes VARCHAR(255) NOT NULL,
--   rating integer NOT NULL default 0,
--   created TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- INSERT INTO moods (notes, rating) VALUES ('I am feeling great!', 7);
-- INSERT INTO moods (notes, rating) VALUES ('moody!', 1);

DROP DATABASE IF EXISTS moodtracker;
CREATE DATABASE moodtracker;
USE moodtracker;

CREATE TABLE moods (
  id integer PRIMARY KEY AUTO_INCREMENT,
  created TIMESTAMP NOT NULL DEFAULT '1970-01-01 00:00:01',
  notes VARCHAR(255) NOT NULL,
  rating integer NOT NULL default 0
);

INSERT INTO moods (notes, rating) VALUES ('eh', 3);
INSERT INTO moods (notes, rating) VALUES ('ehsss', 3);