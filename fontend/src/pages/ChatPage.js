import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChat(data);
  };

  const [chats, setChat] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
