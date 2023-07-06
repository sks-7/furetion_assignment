import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails } from '../Redux/action';
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const MovieDetails = () => {
  const [seat, setSeat] = useState([]);

  const [date, setDate] = useState('');

  const { movieDetailsData } = useSelector((store) => store);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigete = useNavigate();

  const toast = useToast();

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, []);

  console.log(movieDetailsData);

  const handleBookTicket = async () => {
    if (date == '' && seat == '') {
      toast({
        title: 'All field is required.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });

      return;
    }
    try {
      const reservationData = {
        ticketId: id,
        seats: seat,
      };

      await axios.post(
        'https://furetion.onrender.com/api/reservations/add',
        reservationData
      );

      setDate('');

      toast({
        title: 'Ticket is booked .',
        description: 'Enjoy your movie',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        navigete('/ticketdetails');
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex justify="center" mt="30px">
      <Box mr="20px">
        <Box maxW="400px" bg="white" p="4" borderRadius="md" boxShadow="md">
          <Image
            src={movieDetailsData.poster}
            alt={movieDetailsData.name}
            maxH="600px"
            borderRadius="md"
          />
          <Text mt="4" fontWeight="bold" fontSize="xl">
            {movieDetailsData.name}
          </Text>
          <Text mt="2" color="gray.500">
            Price: {movieDetailsData.price}
          </Text>
          <Text mt="2" color="gray.500">
            {movieDetailsData.description}
          </Text>
        </Box>
      </Box>
      <Box>
        <Box maxW="400px" bg="white" p="4" borderRadius="md" boxShadow="md">
          <Input
            type="text"
            placeholder="Enter seat number separated by ,"
            mb="4"
            value={seat.join(',')}
            onChange={(e) => setSeat(e.target.value.split(','))}
          />

          <Input
            type="date"
            mb="4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={handleBookTicket} colorScheme="pink">
            Book ticket
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default MovieDetails;
