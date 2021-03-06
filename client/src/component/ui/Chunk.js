import React from 'react';
import { Text } from '@chakra-ui/react';

export default function Chunk({ name, director, genre, popularity, rating }) {
  return (
    <div className="review-chunk">
      <div className="review-chunk-details">
        <Text className="movie-text">{name}</Text>
        <Text className="director-text">Directed By: {director}</Text>
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
    </div>
  );
}
