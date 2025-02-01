import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/misc/SideDrawer";
import MyCahts from "../components/misc/MyCahts";
import ChatBox from "../components/misc/ChatBox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        bg="red"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyCahts />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
