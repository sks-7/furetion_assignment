import React from 'react';

import { Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MovieListing from './MovieListing';

const HomePage = () => {
  return (
    <div>
      <MovieListing />
    </div>
  );
};

export default HomePage;
