import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Signout } from '../Redux/action';
import {} from 'react-router-dom';

const Navbar = () => {
  const { token, name } = useSelector((store) => store);

  const tost = useToast();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function logout() {
    dispatch(Signout());
    navigate('/');
    tost({
      title: 'Logout successfully 😊😊😊',
      description: 'Thankyou for using my our website  ',
      status: 'success',
      position: 'top',
      duration: 6000,
      isClosable: true,
    });
  }

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
      <Link to="/home">
        <Text fontSize="xl" fontWeight="bold">
          Movie Booking
        </Text>
      </Link>

      {token && <Button onClick={logout}>logout</Button>}

      <Text fontSize={'2xl'} fontWeight={800}>
        {name}
      </Text>

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
