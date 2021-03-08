import React from 'react';
import { Text, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

export default function Chunk({ id, movie_name, director_name, genre, popularity, rating, updateMovieDataFunc }) {
  return (
    <div className="review-chunk">
      <div className="review-chunk-details">
        <Text className="movie-text">{movie_name}</Text>
        <Text className="director-text">Directed By: {director_name}</Text>
        <Text className="genre-text">
          Genre:{' '}
          {genre.map((g, index) => (
            <Text key={index} as="i">
              {g}
              {index !== genre.length - 1 && ', '}
            </Text>
          ))}
        </Text>
      </div>

      <div className="review-chunk-score">
        <Text fontSize="x-small">IMDB Score</Text>
        <Text className="rating-text">{rating}</Text>
        <Text fontSize="xs">
          Popularity: <b>{popularity}%</b>
        </Text>
      </div>
      <div className="review-chunk-crud">
        <IconButton
          size="xs"
          colorScheme="teal"
          aria-label="Edit Movie"
          title="Edit Movie"
          icon={<EditIcon />}
          onClick={() => updateMovieDataFunc({ id, movie_name, director_name, genre, popularity, rating})}
        />

        <IconButton
          size="xs"
          colorScheme="teal"
          aria-label="Delete Movie"
          title="Delete Movie"
          icon={<DeleteIcon />}
        />
      </div>
    </div>
  );
}
