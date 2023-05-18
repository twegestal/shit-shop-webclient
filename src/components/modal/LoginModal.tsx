import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { LoginService } from "../../services/LoginService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await LoginService({
        endpoint: "token",
        data: { username, password },
      });

      localStorage.setItem("token", data.auth_token);
    } catch (error) {
      alert("login failed");
    }

    setUsername("");
    setPassword("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Register
          </Button>
          <Button colorScheme="telegram" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
