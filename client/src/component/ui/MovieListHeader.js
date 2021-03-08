import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

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

export default function MovieListHeader({ sortByFunc, searchFunc, addMovieData }) {
  const searchInputRef = useRef(null)
  const [value, setValue] = useState('');
  const handleChange = event => {
    setValue(e => event.target.value);
  };

  useEffect(() => {
    sortByFunc(value);
  }, [value]);

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      searchHandler();
    }
  };

  const searchHandler = () => {
    searchFunc(searchInputRef.current.value);
  };

  return (
    <div className="movie-list-header">
      <div className="movie-list-searchbar">
        <InputGroup size="sm">
          <Input
            ref={searchInputRef}
            onKeyDown={handleKeypress} 
            pr="4.5rem"
            placeholder="Search by Movies Name or Director title"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={searchHandler}>
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>
      <div className="movie-list-sortby">
        <Text mr="0.5em" width="8em">
          {' '}
          Sort By:
        </Text>
        <Select name="sortBy" size="sm" value={value} onChange={handleChange}>
          {sortByData.map(option => (
            <option key={option.id} value={option.id}>
              {option.text}
            </option>
          ))}
        </Select>
        <div className="movie-list-add-btn">
          <Button  leftIcon={<AddIcon />} size="sm" colorScheme="teal" variant="solid" onClick={addMovieData}>
              Add Movie
          </Button>
        </div>
      </div>
    </div>
  );
}
