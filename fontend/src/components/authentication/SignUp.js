import { Fieldset, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
//import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pic =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  const submitHander = async (params) => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      // toast({
      //   title: "Please fill all the Fiels",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      toast.warn("Please fill all the fields!");
      console.log("Please fill all the Fiels!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      // toast({
      //   title: "Passwords Do not match ",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      toast.warn("Passwords Do not match ");
      console.log("pasword mismatch");
      setLoading(false);
      return;
    }

    try {
      const congfig = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        congfig
      );
      toast.success("Registration Successfull ");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      toast.success("Registration Successfull ");
      navigate("/chats");
    } catch (error) {
      toast.error("Error Occured");

      setLoading(false);
    }
  };

  return (
    <VStack>
      <Fieldset.Root size="lg" maxW="md" invalid>
        <Fieldset.Content>
          <Field label="Name">
            <Input
              name="name"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>

          <Field label="Email">
            <Input
              name="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Password">
            <PasswordInput
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Field label="Confirm Password">
            <PasswordInput
              name="confirmPassword"
              placeholder="Enter Your Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>
        </Fieldset.Content>
        {/* <Fieldset.Content>
          <Field label="Upload Your Image">
            <Input type="file" p={1.5} accept="image/*" onChange={(e) => {}} />
          </Field>
        </Fieldset.Content> */}
      </Fieldset.Root>
      <Button
        loading={Loading}
        colorPalette="blue"
        width="1/2"
        onClick={submitHander}
      >
        SignUp
      </Button>

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      /> */}
    </VStack>
  );
};

export default SignUp;
