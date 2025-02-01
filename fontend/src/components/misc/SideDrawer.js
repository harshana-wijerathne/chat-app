import { Box, Button, Icon, Text } from "@chakra-ui/react";
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

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    console.log("logged Out");
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
          <Button>
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
    </div>
  );
};

export default SideDrawer;
