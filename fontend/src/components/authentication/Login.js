import { Fieldset, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHander = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please fill all the fields in login!");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast.success("Login Successful");
      //setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.warn("Error Occured!");
      setLoading(false);
    }
  };

  return (
    <VStack>
      <Fieldset.Root size="lg" maxW="md" invalid>
        <Fieldset.Content>
          <Field label="Email">
            <Input
              required
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
        </Fieldset.Content>
      </Fieldset.Root>
      <Button
        loading={Loading}
        colorPalette="blue"
        width="1/2"
        onClick={submitHander}
        l
      >
        Login
      </Button>
      {/* <ToastContainer
        position="bottom-center"
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

export default Login;
