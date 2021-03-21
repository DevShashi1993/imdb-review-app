import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import MovieList from '../ui/MovieList';
import MovieListSkeleton from '../ui/MovieListSkeleton';
import MovieListHeader from '../ui/MovieListHeader';
import GroupByGenre from '../ui/GroupByGenre';
import CrudModal from '../ui/CrudModal';
import {
  getAllMovieData,
  searchMovieData,
} from '../../store/actions/movieActions';

export default function Landing() {
  const dispatch = useDispatch();
  const initModalData = {
    id: '',
    movie_name: '',
    director_name: '',
    genre: '',
    rating: '0.0',
    popularity: '0.0',
  };
  const { movieData, isLoading } = useSelector(state => state.movieState);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [modalData, setModalData] = useState(initModalData);

  useEffect(() => {
    dispatch(getAllMovieData());
  }, [dispatch]);

  // console.log('Landing comp rendered');

  const onClose = () => {
    setIsOpen(false);
  };

  const updateMovieData = data => {
    setIsOpen(true);
    setIsNewData(false);
    setModalData(data);
  };

  const addMovieData = data => {
    setIsOpen(true);
    setIsNewData(true);
    setModalData(initModalData);
  };

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
    // setMovieData(newMovieData);
  };

  const searchFunc = async searchStr => {
    dispatch(searchMovieData(searchStr));
  };

  return (
    <Box className="main-section">
      <GroupByGenre />
      <Box className="movie-list-container">
        <MovieListHeader
          sortByFunc={sortBy}
          searchFunc={searchFunc}
          addMovieData={addMovieData}
        />
        {isLoading ? (
          <MovieListSkeleton /> 
        ) : (
          <MovieList movieData={movieData} updateMovieData={updateMovieData} />
        )}
        <CrudModal
          isOpen={isOpen}
          isNewData={isNewData}
          onClose={onClose}
          modalData={modalData}
        />
      </Box>
    </Box>
  );
}
