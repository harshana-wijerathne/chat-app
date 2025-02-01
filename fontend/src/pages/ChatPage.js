import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/misc/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {<SideDrawer />}
      <Box>
        {/* {user && <MyChats />}
        {user && <MyChats />} */}
      </Box>
    </div>
  );
};

export default ChatPage;
