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
import {Box, Button, Image, Text, Input } from "@chakra-ui/react";
import {FaEye} from "react-icons/fa";
import {ChatState} from "../../context/ChatProvider";
import UserBadgeItem from "../user-avatar/UserBadgeItem";

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

    const handleRemove=()=> {
    };
    const handleRename = async () => {};
    const handleSearch = async () => {};

    return (
    <>
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
                    </Box>
                </DialogBody>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button onClick={onClose}>Close</Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
      
    </>
  )
}

export default UpdateGroupChatModel
