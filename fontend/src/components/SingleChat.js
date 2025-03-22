import React, { useState , useEffect} from 'react'
import { ChatState } from '../context/ChatProvider';
import {Box, Input, Spinner, Text} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import {getSender , getSenderFull} from '../config/ChatLogics';
import ProfileModel from "./misc/ProfileModel";
import UpdateGroupChatModel from "./misc/UpdateGroupChatModel";
import axios from "axios";
import {toast} from "react-toastify";
import './style.css';
import ScrollableChat from "./ScrollableChat";
import {io} from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket , selectedChatCompare;

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
      const [isTyping, setIsTyping] = useState(false);


    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("setup",user);
        socket.on("connection", () => setSocketConnected(true));
    },[]);

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            console.log(messages)
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);

        } catch (error) {
            toast.warn("Failed to fetch messages.");
        }
    };
    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat,
                    },
                    config
                );
                console.log(data);
                socket.emit("new message", data);
                setMessages([...messages,data]);

            } catch (error) {
                toast.warn("Failed to send message");
            }
        }
    };

      const typingHandler = async (e) => {
          setNewMessage(e.target.value);
      }

      useEffect(() => {
          fetchMessages();
          selectedChatCompare = selectedChat;
      },[selectedChat]);

      useEffect(()=>{
       socket.on("message recieved", async (newMessageRecieved) => {
           if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
               //give notification
           }else {
               setMessages([...messages,newMessageRecieved]);
           }
       })
      })



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
            justifyContent={{ base: "space-between",md:'space-between' }}
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
              <ProfileModel user = {getSenderFull(user,selectedChat.users)} title={getSenderFull(user,selectedChat.users).name} pic={getSenderFull(user,selectedChat.users).pic} />

              </>
            ) : (
              <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModel
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                      fetchMessages={fetchMessages}

                  />
              </>
            )}
          </Text>
          <Box 
            display={'flex'}
            flexDir={'column'}
            justifyContent={'flex-end'}
            p={3}
            bg={'skyblue'}
            w={'100%'}
            h={'100%'}
            borderRadius={'lg'}
            overflowY={'hidden'}
          >
              {loading ?(
                  <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf={'center'}
                  margin={'auto'}
                  /> ): (
                      <div className="messages">
                          <ScrollableChat messages={messages}/>
                      </div>
              )}
              <Box onKeyDown={sendMessage} mt={3} >
                  <Input
                    variant={'outlined'}
                    backgroundColor={'white'}
                    placeholder={'Enter Message'}
                    onChange={typingHandler}
                    isRequired={true}
                    value={newMessage}
                  ></Input>
              </Box>
          </Box>
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
