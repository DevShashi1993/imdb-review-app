import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, ButtonGroup, Button } from '@chakra-ui/react';
import {
  getAllMovieData,
  groupByGenre,
} from '../../store/actions/movieActions';

const data = [
  { id: 101, text: 'Action', isActive: false },
  { id: 102, text: 'Adult', isActive: false },
  { id: 103, text: 'Adventure', isActive: false },
  { id: 104, text: 'Animation', isActive: false },
  { id: 105, text: 'Biography', isActive: false },
  { id: 106, text: 'Comedy', isActive: false },
  { id: 107, text: 'Crime', isActive: false },
  { id: 108, text: 'Documentary', isActive: false },
  { id: 109, text: 'Drama', isActive: false },
  { id: 110, text: 'Family', isActive: false },
  { id: 111, text: 'Fantasy', isActive: false },
  { id: 112, text: 'Film-Noir', isActive: false },
  { id: 113, text: 'Game-Show', isActive: false },
  { id: 114, text: 'History', isActive: false },
  { id: 115, text: 'Horror', isActive: false },
  { id: 116, text: 'Music', isActive: false },
  { id: 117, text: 'Musical', isActive: false },
  { id: 118, text: 'Mystery', isActive: false },
  { id: 119, text: 'News', isActive: false },
  { id: 120, text: 'Reality-TV', isActive: false },
  { id: 121, text: 'Romance', isActive: false },
  { id: 122, text: 'Sci-Fi', isActive: false },
  { id: 123, text: 'Short', isActive: false },
  { id: 124, text: 'Sport', isActive: false },
  { id: 125, text: 'Talk-Show', isActive: false },
  { id: 126, text: 'Thriller', isActive: false },
  { id: 127, text: 'War', isActive: false },
  { id: 128, text: 'Western', isActive: false },
];

export default function GroupByGenre() {
  const dispatch = useDispatch();
  const [grpByGenreData, setGrpByGenreData] = useState(data);
  // console.log('group By data =>', grpByGenreData);

  const toggleActive = index => {
    let newGrpByGenreData = [...grpByGenreData];
    newGrpByGenreData[index].isActive = !newGrpByGenreData[index].isActive;
    setGrpByGenreData(newGrpByGenreData);

    let grpByArr = grpByGenreData.reduce((acc, cur) => {
      if (cur.isActive === true) acc.push(cur.id);
      return acc;
    }, []);

    grpByArr.length > 0
      ? dispatch(groupByGenre(grpByArr))
      : dispatch(getAllMovieData());
  };

  return (
    <Box className="group-by-genre">
      {/* <Text mr="1em" fontSize="0.8em">
        Group By genre :
      </Text> */}
      <ButtonGroup variant="outline" spacing="4">
        {data.map((item, index) => (
          <Button
            variant="ghost"
            colorScheme="blue"
            key={item.id}
            id={item.id}
            isActive={item.isActive}
            size="xs"
            onClick={() => toggleActive(index)}
          >
            {item.text}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}
