import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAPI } from '../Redux/action';

const Login = () => {
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCreds({
      ...loginCreds,
      [name]: value,
    });
  };

  const handlesubmit = (e) => {
    if (loginCreds) e.preventDefault();
    dispatch(loginAPI(loginCreds, toast, navigate));
  };

  return (
    <div
      bgColor="
    #f2f6f8"
    >
      <Box
        className={styles.outerLogin}
        bg="whiteAlpha.400"
        w="75%"
        h="800px"
        color="white"
      >
        <Box
          className={styles.LoginNav}
          bg="white"
          w="100%"
          h="80px"
          p={5}
          color="white"
        >
          <Box w="auto" display="flex">
            <Text color="blackAlpha.600">Don't have an account? </Text>
            <span>""</span>
            <RouterLink
              to={'/'}
              className={styles.links}
              fontWeight="light"
              bg="white"
              textDecoration="none"
            >
              Sign up
            </RouterLink>
          </Box>
        </Box>
        <Box>
          <Box mt="80px">
            <FormControl
              className={styles.inputContainer}
              bgColor="white"
              width="32%"
              margin="auto"
              height="auto"
              p="30px"
            >
              <Heading color="black" fontSize="xl" fontWeight="600">
                {' '}
                Login
              </Heading>
              <Input
                name="email"
                onChange={handleChange}
                color="black"
                type="email"
                border="1px solid gray"
                mt="30px"
                h="40px"
                placeholder="Enter email"
                borderRadius="none"
                value={loginCreds.email}
              />

              <Input
                name="password"
                value={loginCreds.password}
                onChange={handleChange}
                type="password"
                color="black"
                border="1px solid gray"
                mt="20px"
                h="40px"
                placeholder="Choose password"
                borderRadius="none"
              />

              <Box display="flex" mt="15px" justifyContent="space-between">
                <Box display="flex">
                  <Checkbox />
                  <Text color="black" ml="10px">
                    Stay logged in
                  </Text>
                </Box>
              </Box>
              <Button
                onClick={handlesubmit}
                mb="20px"
                mt="15px"
                h="40px"
                bgColor="#5cc7f8"
                w="100%"
                borderRadius="none"
              >
                LOG IN
              </Button>
              <Box display="flex" justifyContent="space-between">
                <hr width="45%" />
                <Text color="black" mt="-10px">
                  OR
                </Text>
                <hr width="45%" />
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
