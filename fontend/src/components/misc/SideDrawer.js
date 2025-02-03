import { Box, Button, Icon, Text, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
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
import { findAllByAltText } from "@testing-library/react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    console.log("logged Out");
  };

  const handleSearch = () => {};

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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <DrawerActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerActionTrigger>
            <Button>Save</Button>
          </DrawerFooter>
          <DrawerCloseTrigger onClick={() => setOpen(false)} />
        </DrawerContent>
      </DrawerRoot>
    </div>
  );
};

export default SideDrawer;
