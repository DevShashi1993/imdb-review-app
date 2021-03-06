import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import MovieList from '../ui/MovieList';
import MovieListHeader from '../ui/MovieListHeader';
import GroupByGenre from '../ui/GroupByGenre';
import initMovieData from '../../movie-data.json';

export default function Landing() {
  const [movieData, setMovieData] = useState([]);
  console.log('Landing comp rendered')

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const res = await axios.get('http://localhost:5000/movie/all');

        if (res.status === 200) {
          let newMovieData = await res.data;
          newMovieData = newMovieData.map(obj => {
            let { id, name, director, imdb_score, popularity, genres } = obj;
            genres = genres.length > 0 ? genres.split(',') : [];
            return {
              id: id,
              name: name,
              director: director,
              imdb_score: imdb_score,
              popularity: popularity,
              genre: genres,
            };
          });

          setMovieData(newMovieData);
          // console.log('newMovieData => ', newMovieData);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

    fetchMovieData();
  }, []);

  const sortBy = sortby => {
    let newMovieData = [...movieData];
    switch (sortby) {
      case '101':
        newMovieData = newMovieData.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case '102':
        newMovieData = newMovieData.sort(
          (a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score)
        );
        break;
      case '103':
        newMovieData = newMovieData.sort(
          (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
        );
        break;
      case '104':
        newMovieData = newMovieData.sort((a, b) =>
          a.director.localeCompare(b.director)
        );
        break;
      default:
        break;
    }
    setMovieData(newMovieData);
  };

  const searchFunc = async searchStr => {
    try {
      const res = await axios.get(`http://localhost:5000/movie/search`, {
        params: {
          keyword: searchStr,
        },
      });
      
      if (res.status === 200) {
        let newMovieData = await res.data;
        newMovieData = newMovieData.map(obj => {
          let { id, name, director, imdb_score, popularity, genres } = obj;
          genres = genres.length > 0 ? genres.split(',') : [];
          return {
            id: id,
            name: name,
            director: director,
            imdb_score: imdb_score,
            popularity: popularity,
            genre: genres,
          };
        });
        console.log('newMovieData => ', res.data);
        setMovieData(newMovieData);
        
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const groupBy = groupby => {
    let newMovieData = initMovieData;
    newMovieData = newMovieData.filter(data => groupby.every(g => data.genre.includes(g)));
    setMovieData(newMovieData);
  };

  return (
    <Box className="main-section">
      <GroupByGenre groupByHandler={groupBy} />
      <Box className="movie-list-container">
        <MovieListHeader sortByFunc={sortBy} searchFunc={searchFunc} />
        <MovieList movieData={movieData} />
      </Box>
    </Box>
  );
}
