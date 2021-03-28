import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Select,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { searchMovieData, sortBy } from '../../store/actions/movieActions';
import { FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

const sortByData = [
  {
    id: '101',
    text: 'Movie Name',
  },
  {
    id: '102',
    text: 'Rating',
  },
  {
    id: '103',
    text: 'Popularity',
  },
  {
    id: '104',
    text: 'Director Name',
  },
];

export default function MovieListHeader({ addMovieData }) {
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const [sortByAsc, setSortByAsc] = useState(true);
  const [sortByDrpValue, setSortByDrpValue] = useState('101');

  const handleChange = event => {
    let order = sortByAsc ? 'ASC' : 'DESC';
    let sortByObj = { sortBy: event.target.value, order };
    setSortByDrpValue(e => event.target.value);
    dispatch(sortBy(sortByObj));
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const searchHandler = () => {
    let searchStr = searchInputRef.current.value;
    dispatch(searchMovieData(searchStr));
  };

  const togggleSortBy = () => {
    // set order value to DESC when sortByAsc current value is true
    let order = sortByAsc ? 'DESC' : 'ASC';
    let sortByObj = { sortBy: sortByDrpValue, order };
    setSortByAsc(!sortByAsc);
    dispatch(sortBy(sortByObj));
  };

  return (
    <div className="movie-list-header">
      <div className="movie-list-searchbar">
        <InputGroup size="sm">
          <Input
            ref={searchInputRef}
            onKeyDown={handleKeypress}
            pr="4.5rem"
            placeholder="Search by Movie Name or Director Name"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={searchHandler}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
      <div className="movie-list-sortby">
        <Text mr="0.5em" width="10em">
          {' '}
          Sort By:
        </Text>
        <Select
          variant="outline"
          name="sortBy"
          size="sm"
          value={sortByDrpValue}
          onChange={handleChange}
        >
          {sortByData.map(option => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </Select>
        <IconButton
          variant="ghost"
          size="sm"
          colorScheme="teal"
          aria-label="Sort by"
          onClick={togggleSortBy}
          icon={sortByAsc ? <FaSortAmountDownAlt /> : <FaSortAmountUp />}
        />
        <div className="movie-list-add-btn">
          <Button
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="teal"
            variant="solid"
            onClick={addMovieData}
          >
            Add Movie
          </Button>
        </div>
      </div>
    </div>
  );
}
