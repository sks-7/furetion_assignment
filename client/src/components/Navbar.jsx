import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex
      h="100px"
      w="100%"
      bg="pink.200"
      alignItems="center"
      justify="space-between"
      p="20px"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    >
      <Link to="/">
        <Text fontSize="xl" fontWeight="bold">
          Movie Booking
        </Text>
      </Link>

      <Link to="/ticketdetails">
        <Button>Booked ticket</Button>
      </Link>

      <InputGroup w="300px">
        <InputRightElement pointerEvents="none">
          <AiOutlineSearch color="gray.300" style={{ fontSize: '20px' }} />
        </InputRightElement>
        <Input
          type="text"
          placeholder="Search Movie"
          bg="white"
          color={'black'}
        />
      </InputGroup>
    </Flex>
  );
};

export default Navbar;
