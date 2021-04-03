import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMovieData } from '../../store/actions/movieActions';
import Chunk from '../ui/Chunk';

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function MovieList({ movieData, updateMovieData }) {
  const dispatch = useDispatch();
  const { page } = useSelector(state => state.movieState);
  
  const callApi = async () => {
    dispatch(getAllMovieData(page + 1));
  };

  const debouncedApi = debounce(() => callApi(), 250);

  const handleScroll = e => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      debouncedApi();
    }
  };

  return (
    <>
      <div className="movie-list" onScroll={handleScroll}>
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
