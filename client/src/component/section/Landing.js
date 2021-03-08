import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import MovieList from '../ui/MovieList';
import MovieListHeader from '../ui/MovieListHeader';
import GroupByGenre from '../ui/GroupByGenre';
import CrudModal from '../ui/CrudModal';
// import initMovieData from '../../movie-data.json';

export default function Landing() {
  const initModalData = {
    id: '',
    movie_name : '',
    director_name : '',
    genre : '',
    rating : '0.0',
    popularity : '0.0',
  }
  const [movieData, setMovieData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [modalData, setModalData] = useState(initModalData);
  console.log('Landing comp rendered')

  const onClose = () => {
    setIsOpen(false);
  };

  const updateMovieData = (data) => {
    setIsOpen(true);
    setIsNewData(false);
    setModalData(data);
  };

  const addMovieData = (data) => {
    setIsOpen(true);
    setIsNewData(true)
    setModalData(initModalData);
  };

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const res = await axios.get('/movie/all');

        if (res.status === 200) {
          let newMovieData = await res.data;
          
          newMovieData = newMovieData.map(obj => {
            let { id, name, director, imdb_score, popularity, genres } = obj;
            genres = genres && genres.length > 0 ? genres.split(',') : [];
            return {
              id: id,
              movie_name: name,
              director_name: director,
              rating: imdb_score,
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
      const res = await axios.get(`/movie/search`, {
        params: {
          keyword: searchStr,
        },
      });
      
      if (res.status === 200) {
        let newMovieData = await res.data;
        newMovieData = newMovieData.map(obj => {
          let { id, name, director, imdb_score, popularity, genres } = obj;
          genres = genres && genres.length > 0 ? genres.split(',') : [];
          return {
            id: id,
            movie_name: name,
            director_name: director,
            rating: imdb_score,
            popularity: popularity,
            genre: genres,
          };
        });
        // console.log('newMovieData => ', res.data);
        setMovieData(newMovieData);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const groupBy = groupby => {
    let newMovieData = [...movieData];
    newMovieData = newMovieData.filter(data => groupby.every(g => data.genre.includes(g)));
    console.log("newMovieData ", newMovieData);
    setMovieData(newMovieData);
  };

  return (
    <Box className="main-section">
      <GroupByGenre groupByHandler={groupBy} />
      <Box className="movie-list-container">
        <MovieListHeader sortByFunc={sortBy} searchFunc={searchFunc} addMovieData={addMovieData} />
        <MovieList movieData={movieData} updateMovieData={updateMovieData}/>
        <CrudModal isOpen={isOpen} isNewData={isNewData} onClose={onClose} modalData={modalData} />
      </Box>
    </Box>
  );
}
