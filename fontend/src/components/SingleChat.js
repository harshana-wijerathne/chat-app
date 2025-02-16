import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box, Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import {getSender , getSenderFull} from '../config/ChatLogics';
import ProfileModel from "./misc/ProfileModel";

const SingleChat = ({fetchAgain,setFetchAgain}) => {
      const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
      } = ChatState();
      const [messages, setMessages] = useState([]);
      const [loading, setLoading] = useState(false);
      const [newMessage, setNewMessage] = useState("");
      const [socketConnected, setSocketConnected] = useState(false);
      const [typing, setTyping] = useState(false);
      const [istyping, setIsTyping] = useState(false);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between",md:'start' }}
            alignItems="center"
          >
            <div>
              <Button
                display={{ base: "flex", md: "none" }}
                onClick={() => setSelectedChat("")}
              >
                <FaArrowLeft />
              </Button>
            </div>
            {!selectedChat.isGroupChat ? (
              <>
              {getSender(user,selectedChat.users)}
              {/* <ProfileModel user = {getSenderFull(user,selectedChat.users)}/> */}

              </>
            ) : (
              <>{selectedChat.chatName.toUpperCase()}</>
            )}
          </Text>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat
