import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogTrigger,
} from "../ui/dialog";
import { Button, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";

const ProfileModel = ({ title, pic, isOpen, onClose, children }) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* <Button bg={'transparent'} color={'white'}>My Profile</Button>         */}
        <Text><FaEye /></Text>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
            {title}

          <div>
            {" "}
            <Image src={pic} />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            ></Text>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={onClose}>Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ProfileModel;
