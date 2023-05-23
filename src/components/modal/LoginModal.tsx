import { useState } from "react";
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
import { FetchData } from "../../services/FetchData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

const LoginModal = ({ isOpen, onClose, onSwitch }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await FetchData({
        endpoint: "token",
        method: "POST",
        data: { username, password },
      });

      if (data.auth_token) {
        localStorage.setItem("token", data.auth_token);
        onClose();
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input onChange={(e) => setUsername(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="telegram" mr={3} onClick={handleLogin}>
            Login
          </Button>
          <Button variant="ghost" onClick={onSwitch}>
            Register
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
