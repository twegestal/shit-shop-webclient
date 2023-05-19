import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { LoginService } from "../../services/LoginService";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    navigate("/main");
    event.preventDefault();

    try {
      const data = await LoginService({
        endpoint: "token",
        data: { username, password },
      });

      localStorage.setItem("token", data.auth_token);
      navigate("/main"); // navigate to main page
    } catch (error) {
      alert("login failed");
    }
  };

  const handleRegister = () => {
    // Perform register action
    navigate("/register");
  };

  return (
    <Box p={8}>
      <VStack spacing={4}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <HStack spacing={4}>
          <Button colorScheme="telegram" onClick={handleSubmit}>
            Login
          </Button>
          <Button colorScheme="teal" onClick={handleRegister}>
            Register
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginForm;
