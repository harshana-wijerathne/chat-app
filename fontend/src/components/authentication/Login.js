import { Fieldset, Input, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../ui/button";
import { Alert } from "../ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount or state change
    }
  }, [alertMessage]);

  const submitHander = async () => {
    setLoading(true);
    if (!email || !password) {
      //toast.warn("Please fill all the fields in login!");

      setAlertMessage("Please fill all the fields in login!");

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
      //setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
      toast.success("Login Successful");
      setAlertMessage("Login Successful");
    } catch (error) {
      toast.warn("Error Occured!");
      setLoading(false);
    }
  };

  return (
    <VStack>
      {/* Conditionally render the Alert */}

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
      {alertMessage && <Alert status="error" title={alertMessage} />}
    </VStack>
  );
};

export default Login;
