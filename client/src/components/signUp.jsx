import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import styles from '../components/signup.module.css';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  // const isAuth = useSelector((store)=> store.auth.signupSuccess)
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({});
  const [api, setApi] = useState({});


  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginCreds({
      ...loginCreds,
      [name]: value,
    });
  };

  console.log(loginCreds);

  function Signupdata(loginCreds) {
    return axios.post(
      `https://furetion-tech.onrender.com/user/signup`,
      loginCreds
    );
  }

  const handleClick = () => {
    Signupdata(loginCreds)
      .then((res) => {
        setApi(res.data);

        toast({
          title: 'Account created.',
          description: 'Start your time tracking journey',
          position: 'top',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      })
      .catch((error) => {
        toast({
          title: 'Account Not Created.',
          description: "We can't Create your account ",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };



  return (
    <div
      bgColor="
    #f2f6f8"
    >
      <Box
        className={styles.outerSignup}
        bg="whiteAlpha.400"
        w="75%"
        h="800px"
        color="white"
      >
        <Box
          className={styles.signupNav}
          bg="white"
          w="100%"
          h="80px"
          p={5}
          color="white"
        >
         
          <RouterLink
            className={styles.links}
            fontWeight="light"
            bg="white"
            textDecoration="none"
            to={'/login'}
          >
            Log In
          </RouterLink>
        </Box>
        <Box>
          <Box mt="40px">
           
            <Box
              color="gray"
              fontWeight="light"
              display="flex"
              margin="auto"
              textAlign="center"
              width="350px"
            >
             
            </Box>
          </Box>
          {/* Input container started */}
          <Box mt="30px">
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
                Sign up
              </Heading>
              <Input
                name="email"
                value={loginCreds.email}
                onChange={handleChange}
                color="black"
                type="email"
                border="1px solid gray"
                mt="30px"
                h="40px"
                placeholder="Enter email"
                borderRadius="none"
              />

              <Input
                name="password"
                onChange={handleChange}
                value={loginCreds.password}
                type="password"
                color="black"
                border="1px solid gray"
                mt="20px"
                h="40px"
                placeholder="Choose password"
                borderRadius="none"
              />
              <Box display="flex" mt="15px">
                <Box display="flex">
                  <Checkbox />
                  <Text color="black" ml="10px">
                    I agree to the
                  </Text>
                </Box>
                <Text className={styles.links}>Terms of Use</Text>
              </Box>
              <Button
                onClick={handleClick}
                mb="20px"
                mt="15px"
                h="40px"
                bgColor="#5cc7f8"
                w="100%"
                borderRadius="none"
              >
                CREATE FREE ACCOUNT
              </Button>
              <Box display="flex" justifyContent="space-between">
                <hr width="45%" />
                <Text color="black" mt="-10px">
                  OR
                </Text>
                <hr width="45%" />
              </Box>

              <Button
                fontWeight="medium"
                mb="20px"
                mt="15px"
                h="40px"
                w="100%"
                bgColor="white"
                color="blackAlpha.600"
                border="1px solid gray"
                borderRadius="none"
               
              >
                Continue with Google
              </Button>
            </FormControl>
          </Box>
          {/* Footer */}
          <Box>
           
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
