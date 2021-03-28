import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import MovieList from '../ui/MovieList';
import MovieListSkeleton from '../ui/MovieListSkeleton';
import MovieListHeader from '../ui/MovieListHeader';
import GroupByGenre from '../ui/GroupByGenre';
import CrudModal from '../ui/CrudModal';
import { getAllMovieData } from '../../store/actions/movieActions';

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

  return (
    <Box className="main-section">
      <GroupByGenre />
      <Box className="movie-list-container">
        <MovieListHeader addMovieData={addMovieData} />
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
