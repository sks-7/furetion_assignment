import React, { useState } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Box,
  Button,
  useToast,
  IconButton,
} from '@chakra-ui/react';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { GoDotFill } from 'react-icons/go';

const TicketDetails = () => {
  const [reservedTicket, setReservedTicket] = useState([]);
  const navigate = useNavigate();

  const toast = useToast();

  const getReservedTicketDetails = async () => {
    let res = await axios.get('https://furetion.onrender.com/api/reservations');

    console.log(res.data);

    setReservedTicket(res.data);
  };

  useEffect(() => {
    getReservedTicketDetails();
  }, []);

  const lodaScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');

      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handalPay = async (price) => {
    const res = await lodaScript(import.meta.env.VITE_URL);

    if (!res) {
      alert('Yor are offline...');

      return;
    }

    const options = {
      key: import.meta.env.VITE_ID,
      currency: 'INR',
      amount: price * 100,
      name: 'payment',
      description: 'Thanks for booking ticket',

      handler: function (res) {
        toast({
          title: res.razorpay_payment_id,
          status: 'success',
          duration: 400,
          isClosable: true,
        });

        toast({
          title: 'Payment Successfull',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });

        navigate('/');
      },

      prifill: {
        name: 'thanks for make payment',
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <>
      <Box mt="40px">
        <TableContainer>
          <Table variant="striped" colorScheme="#e8f5fd">
            <Thead>
              <Tr>
                <Th>Poster</Th>
                <Th>Movie Name</Th>
                <Th>Avaliable</Th>
                <Th>seat details</Th>
                <Th>ToatlePrice</Th>
                <Th>Time</Th>
                <Th>pay</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reservedTicket &&
                reservedTicket.map((ele) => (
                  <Tr key={ele._id}>
                    <Td>
                      <Image
                        w="100px"
                        src={ele.ticketId.poster}
                        alt={ele.name}
                      />
                    </Td>
                    <Td>{ele.ticketId.name}</Td>
                    <Td>
                      {/* {ele.ticketId.available == true ? (
                        <Text color={ele.ticketId.available ? 'green' : 'red'}>
                          Avaliable
                        </Text>
                      ) : (
                        <Text>Not Availible</Text>
                      )} */}

                      <Text>
                        {ele.ticketId.available ? (
                          <IconButton
                            colorScheme={
                              ele.ticketId.available ? 'green' : 'red'
                            }
                            aria-label="Availability"
                            icon={<GoDotFill />}
                          />
                        ) : (
                          <IconButton
                            colorScheme="red"
                            aria-label="Availability"
                            icon={<GoDotFill />}
                          />
                        )}
                      </Text>
                    </Td>

                    <Td>{ele.seats.length}</Td>
                    <Td>{ele.totalPrice}</Td>
                    <Td>{ele.timestamp}</Td>
                    <Td>
                      <Button
                        onClick={() => handalPay(ele.totalPrice)}
                        colorScheme="pink"
                        display={'block'}
                        m="auto"
                        isDisabled={!ele.ticketId.available}
                      >
                        pay now
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TicketDetails;
