import React, {  } from 'react';
import { Stack } from '@chakra-ui/react';
import Chunk from '../ui/Chunk';

export default function MovieList({movieData}) {
  return (
    
    movieData ? (
      <Stack className="movie-list">
        {movieData.map((movieObj, index) => (
          <Chunk
            key={index}
            name={movieObj.name}
            director={movieObj.director}
            genre={movieObj.genre}
            rating={movieObj.imdb_score}
            popularity={movieObj.popularity}
          />
        ))}
      </Stack>
    ) : (<div>Loading....</div>)
  );
}
