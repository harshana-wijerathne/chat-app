import { Field, Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { IoAdd } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import  axios  from "axios";
import {ChatState} from "../../context/ChatProvider"
import UserListItem from "../user-avatar/UserListItem"
import { Box } from "@chakra-ui/react";
import UserBadgeItem from "../user-avatar/UserBadgeItem";

const GroupChatModel = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
    const { user, chats, setChats } = ChatState();

    const [isOpen, setIsOpen] = useState(false);

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
      toast.warn('Fail to Load the Search Result')
    }

  };
  const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
          toast.warn("Fill all the feilds")
          return;
        }

        try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          const { data } = await axios.post(
            `/api/chat/group`,
            {
              name: groupChatName,
              users: JSON.stringify(selectedUsers.map((u) => u._id)),
            },
            config
          );
          toast.success("Group Created")
          setChats([data, ...chats]);
          setIsOpen(false);
        } catch (error) {
          toast.error("error.response.data");
        }
  };

  const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
          toast.warn("User Already Added")
          return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete=(delUser)=>{
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };



  return (
    <DialogRoot
      key={"center"}
      placement={"center"}
      motionPreset="slide-in-bottom"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button
          display="flex"
          flexDirection="row"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          _hover={{ bg: "blue" }}
        >
          <IoAdd />
          New Group Chat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          display={"flex"}
          flexDirection={"column"}
          alignItems={"conter"}
        >
          <Field.Root>
            <Input
              onChange={(e) => setGroupChatName(e.target.value)}
              placeholder="Chat Name"
            />
            <Input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Add Users eg: John, Piyush, Jane"
            />
          </Field.Root>
          <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>

          {loading ? (
            <div>loading</div>
          ) : (
            searchResult
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleSubmit}>Create Chat</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default GroupChatModel;
