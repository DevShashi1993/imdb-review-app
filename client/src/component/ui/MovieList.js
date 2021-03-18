import React, { useState } from 'react';
import Chunk from '../ui/Chunk';

export default function MovieList({ movieData, updateMovieData}) {
  return (
    <>
      <div className="movie-list">
        {movieData.length > 0 &&
          movieData.map((movieObj, index) => (
            <Chunk
              id={movieObj.id}
              key={movieObj.id}
              movie_name={movieObj.movie_name}
              director_name={movieObj.director_name}
              genre={movieObj.genre}
              rating={movieObj.rating}
              popularity={movieObj.popularity}
              updateMovieDataFunc={updateMovieData}
            />
          ))}
      </div>
    </>
  );
}
