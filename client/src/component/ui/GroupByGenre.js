import React, { useState } from 'react';
import { Box, ButtonGroup, Button } from '@chakra-ui/react';

const data = [
  { id: '1', text: 'Action', isActive: false },
  { id: '2', text: 'Adult', isActive: false },
  { id: '3', text: 'Adventure', isActive: false },
  { id: '4', text: 'Animation', isActive: false },
  { id: '5', text: 'Biography', isActive: false },
  { id: '6', text: 'Comedy', isActive: false },
  { id: '7', text: 'Crime', isActive: false },
  { id: '8', text: 'Documentary', isActive: false },
  { id: '9', text: 'Drama', isActive: false },
  { id: '10', text: 'Family', isActive: false },
  { id: '11', text: 'Fantasy', isActive: false },
  { id: '12', text: 'Film-Noir', isActive: false },
  { id: '13', text: 'Game-Show', isActive: false },
  { id: '14', text: 'History', isActive: false },
  { id: '15', text: 'Horror', isActive: false },
  { id: '16', text: 'Music', isActive: false },
  { id: '17', text: 'Musical', isActive: false },
  { id: '18', text: 'Mystery', isActive: false },
  { id: '19', text: 'News', isActive: false },
  { id: '20', text: 'Reality-TV', isActive: false },
  { id: '21', text: 'Romance', isActive: false },
  { id: '22', text: 'Sci-Fi', isActive: false },
  { id: '23', text: 'Short', isActive: false },
  { id: '24', text: 'Sport', isActive: false },
  { id: '25', text: 'Talk-Show', isActive: false },
  { id: '26', text: 'Thriller', isActive: false },
  { id: '27', text: 'War', isActive: false },
  { id: '28', text: 'Western', isActive: false },
];

export default function GroupByGenre({ groupByHandler }) {
  const [grpByGenreData, setGrpByGenreData] = useState(data);
  // console.log('group By data =>', grpByGenreData);

  const toggleActive = index => {
    let newGrpByGenreData = [...grpByGenreData];
    newGrpByGenreData[index].isActive = !newGrpByGenreData[index].isActive;
    setGrpByGenreData(newGrpByGenreData);

    let grpByArr = grpByGenreData.reduce((acc, cur) => {
      if (cur['isActive'] === true) acc.push(cur['text']);
        return acc;
    },[]);
    groupByHandler(grpByArr);
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
