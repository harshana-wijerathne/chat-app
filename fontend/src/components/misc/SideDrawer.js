import { Box, Button, Icon, Text, Input, Spinner } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { Tooltip } from "../ui/tooltip";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { LuChevronDown } from "react-icons/lu";
import { HiSortAscending } from "react-icons/hi";
import { Avatar } from "../ui/avatar";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../user-avatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!search) return; // Prevent calling on empty search

    const delayDebounce = setTimeout(() => {
      handleSearch();
    }, 500); // Adjust delay as needed

    return () => clearTimeout(delayDebounce); // Cleanup timeout on each update
  }, [search]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    console.log("logged Out");
  };

  const accesChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {
      toast.warn("Error fetching the chat");
    }
  };

  const handleSearch = async () => {
    if (!search) {
      console.log("Empty");
      toast.warn("Please Enter something to search");
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
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.warn("Error Occured!");
    }
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip
          showArrow
          positioning={{ placement: "right-end" }}
          content="Search User to chat"
        >
          <Button
            onClick={() => {
              open ? setOpen(false) : setOpen(true);
            }}
          >
            <i className="fa fa-search"></i>
            <Text display={{ base: "none", md: "flex" }}>Search User</Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"Arial"} fontWeight={"bold"}>
          Athena-Chat
        </Text>
        <div>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" size="sm">
                <i className="fa fa-bell"></i>
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
            </MenuContent>
          </MenuRoot>
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LuChevronDown />
                <Avatar size="sm" name={user.name} src={user.pic} />
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem onClick={() => setIsProfileDialogOpen(true)}>
                My Profile
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Log Out</MenuItem>
            </MenuContent>
          </MenuRoot>
        </div>
      </Box>
      <ProfileModel
        title={user.name}
        pic={user.pic}
        isOpen={isProfileDialogOpen}
        onClose={() => setIsProfileDialogOpen(false)}
      ></ProfileModel>
      <DrawerRoot
        open={open}
        onClose={() => setOpen(false)}
        placement={"start"}
      >
        {/* <DrawerBackdrop bg={"yellow"} /> */}
        <DrawerContent>
          <DrawerHeader>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                width={"190px"}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              ></Input>
              <Button onClick={handleSearch}>Go</Button>
            </Box>
          </DrawerHeader>
          <DrawerBody>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accesChat(user._id);
                  }}
                />
              ))
            )}
            <ToastContainer
              position="bottom-left"
              autoClose={2000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
            {loadingChat && <Spinner ml="auto" display={"flex"} />}
          </DrawerBody>
          <DrawerCloseTrigger onClick={() => setOpen(false)} />
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
};

export default SideDrawer;
