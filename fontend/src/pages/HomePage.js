import React, { useEffect } from "react";
import { Tabs, Container, Box, Text } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chat");
  }, [navigate]);

  return (
    <Container justifyItems="center">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="50%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
          justifySelf="center"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w="50%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        justifySelf="center"
      >
        <Tabs.Root defaultValue="members">
          <Tabs.List>
            <Tabs.Trigger value="members" color="black" colorPalette="cyan">
              Login
            </Tabs.Trigger>
            <Tabs.Trigger value="projects" color="black" colorPalette="cyan">
              SignUp
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="members">
            <Login />
          </Tabs.Content>
          <Tabs.Content value="projects">
            <SignUp />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </Container>
  );
};

export default HomePage;
