--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE imdb;

CREATE TABLE IF NOT EXISTS movies (
   	id INT GENERATED ALWAYS AS IDENTITY (START WITH 100001) PRIMARY KEY,
	name VARCHAR ( 100 ) NOT NULL,
	director VARCHAR ( 100 ) NOT NULL,
	imdb_score NUMERIC(2,1) NOT NULL,
	popularity NUMERIC(3,1) NOT NULL
);


CREATE TABLE IF NOT EXISTS genre (
   	id INT GENERATED ALWAYS AS IDENTITY (START WITH 101) PRIMARY KEY,
	name VARCHAR ( 20 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS movie_genre (
   	movie_id INT NOT NULL,
	genre_id INT NOT NULL,
	CONSTRAINT fk_movie_genre_movie_id FOREIGN KEY(movie_id) REFERENCES movies(id),
	CONSTRAINT fk_movie_genre_genre_id FOREIGN KEY(genre_id) REFERENCES genre(id)
);
