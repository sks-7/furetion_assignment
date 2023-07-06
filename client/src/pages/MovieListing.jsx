import React, { useEffect } from 'react';
import { Box, Button, Image, SimpleGrid, Text } from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../Redux/action';
import { Link } from 'react-router-dom';

const MovieListing = () => {
  const { moviedata } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovie());
  }, []);

  return (
    <Box w="90%" m="auto" mt="30px" p="20px" bg="gray.200" borderRadius="md">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={10}>
        {moviedata.map((ele) => (
          <Box
            p="10px"
            bg="white"
            border="1px solid gray"
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            key={ele._id}
          >
            <Image
              src={ele.poster}
              alt={ele.name}
              height="300px"
              objectFit="cover"
              borderRadius="md"
            />
            <Text mt="3" fontWeight="bold" fontSize="lg">
              {ele.name}
            </Text>
            <Text mt="2" fontSize="lg" color="gray.600">
              {ele.price}
            </Text>

            <Text mb="10px" color={ele.available?"green":"red"}>{ele.available ? 'Available' : 'Sold Out'}</Text>

            <Link to={`/movie/${ele._id}`}>
              <Button>Show Details</Button>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MovieListing;
