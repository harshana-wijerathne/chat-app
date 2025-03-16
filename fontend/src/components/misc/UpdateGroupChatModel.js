import React, {useState} from 'react'
import {
    DialogActionTrigger,
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader, DialogRoot,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog";
import {Box, Button, Image, Text, Input, Spinner} from "@chakra-ui/react";
import {FaEye} from "react-icons/fa";
import {ChatState} from "../../context/ChatProvider";
import UserBadgeItem from "../user-avatar/UserBadgeItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserListItem from "../user-avatar/UserListItem";

const UpdateGroupChatModel = ({fetchAgain , setFetchAgain ,isOpen ,onClose , title,pic}) => {

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);
    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification,
    } = ChatState();

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast.warn("Only admins can remove someone!");
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/groupremove`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            // fetchMessages();
            setLoading(false);
        } catch (error) {
            toast.warn("Error Occured!");
            setLoading(false);
        }
        setGroupChatName("");
    };
    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/rename`,
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                config
            );

            console.log(data._id);
            // setSelectedChat("");
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            toast.warn("Error Occured!");
            setRenameLoading(false);
        }
        setGroupChatName("");
    };
    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast.warn("Error Occured!");
            setLoading(false);
        }
    };
    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in group!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can add someone!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/chat/groupadd`,
                {
                    chatId: selectedChat._id,
                    userId: user1._id,
                },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            toast.warn("Error Occured!");
        }
        setGroupChatName("");
    };


    return (
    <div>
        <DialogRoot open={isOpen} onOpenChange={onClose}>
            <DialogTrigger asChild>
                {/* <Button bg={'transparent'} color={'white'}>My Profile</Button>         */}
                <Text><FaEye /></Text>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >{selectedChat.chatName}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                        {selectedChat.users.map((u) => (
                            <UserBadgeItem
                                key={u._id}
                                user={u}
                                admin={selectedChat.groupAdmin}
                                handleFunction={() => handleRemove(u)}
                            />
                        ))}
                    </Box>
                    <Box display="flex">
                        <Input
                            placeholder="Chat Name"
                            mb={3}
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            ml={1}
                            isLoading={renameloading}
                            onClick={handleRename}
                        >
                            Update
                        </Button>
                    </Box>
                    <Box>
                        <Input
                            placeholder="Add User to group"
                            mb={1}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        {loading ?(
                            <Spinner size={'lg'}/>
                        ):(
                            searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            )))}
                    </Box>
                </DialogBody>
                <DialogFooter>
                    <Button onClick={() => handleRemove(user)} colorPalette="red">
                        Leave Group
                    </Button>
                    <DialogActionTrigger asChild>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
        <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
        />
      
    </div>
  )
}

export default UpdateGroupChatModel
