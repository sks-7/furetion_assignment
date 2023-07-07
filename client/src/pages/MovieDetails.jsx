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
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const MovieDetails = () => {
  const [seat, setSeat] = useState([]);
  const [date, setDate] = useState('');
  const [availableSeats, setAvailableSeats] = useState([]);

  const { movieDetailsData } = useSelector((store) => store);
  console.log(movieDetailsData);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, []);

  useEffect(() => {
    const newAvailableSeats = [];
    for (let i = 1; i <= 10; i++) {
      if (seat.includes(i.toString())) {
        newAvailableSeats.push({ number: i, available: false });
      } else {
        newAvailableSeats.push({ number: i, available: true });
      }
    }
    setAvailableSeats(newAvailableSeats);
  }, [seat]);

  const handleSeatSelection = (selectedSeat) => {
    const updatedSeat = [...seat];
    if (updatedSeat.includes(selectedSeat)) {
      const index = updatedSeat.indexOf(selectedSeat);
      updatedSeat.splice(index, 1);
    } else {
      updatedSeat.push(selectedSeat);
    }
    setSeat(updatedSeat);
  };

  const handleBookTicket = async () => {
    if (date === '' || seat.length === 0) {
      toast({
        title: 'All fields are required.',
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
      setSeat([]);

      toast({
        title: 'Ticket is booked.',
        description: 'Enjoy your movie.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/ticketdetails');
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
            placeholder="Enter seat number separated by comma"
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

          <SimpleGrid columns={5} spacing={2} mt="4">
            {availableSeats.map((seat) => (
              <Button
                key={seat.number}
                m="2"
                colorScheme={seat.available ? 'green' : 'red'}
                onClick={() => handleSeatSelection(seat.number.toString())}
              >
                {seat.number}
              </Button>
            ))}
          </SimpleGrid>

          <Button
            isDisabled={!movieDetailsData.available}
            onClick={handleBookTicket}
            colorScheme="pink"
            mt="4"
            w="100%"
          >
            Book Ticket
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default MovieDetails;
