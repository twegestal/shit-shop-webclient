import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { LoginService } from "../../services/LoginService";

interface Props {
  onSwitch: () => void;
  onClose: () => void;
}

const RegisterForm = ({ onSwitch, onClose }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    dob: "",
    password: "",
  });

  const handleRegister = async (event: any) => {
    event.preventDefault();

    const newErrors = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      dob: "",
      password: "",
    };
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.values(newErrors).some((error) => error !== "")) {
      setFormErrors(newErrors);
      return;
    }

    try {
      const data = await LoginService({
        endpoint: "register",
        data: { firstName, lastName, username, email, dob, password },
      });

      localStorage.setItem("token", data.token);
      onClose();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl id="firstName" isRequired isInvalid={!!formErrors.firstName}>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormErrorMessage>{formErrors.firstName}</FormErrorMessage>
      </FormControl>
      <FormControl id="lastName" isRequired isInvalid={!!formErrors.lastName}>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <FormErrorMessage>{formErrors.lastName}</FormErrorMessage>
      </FormControl>
      <FormControl id="username" isRequired isInvalid={!!formErrors.username}>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormErrorMessage>{formErrors.username}</FormErrorMessage>
      </FormControl>
      <FormControl id="email" isRequired isInvalid={!!formErrors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormErrorMessage>{formErrors.email}</FormErrorMessage>
      </FormControl>
      <FormControl id="dob" isRequired isInvalid={!!formErrors.dob}>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <FormErrorMessage>{formErrors.dob}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isRequired isInvalid={!!formErrors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormErrorMessage>{formErrors.password}</FormErrorMessage>
      </FormControl>
      <Button colorScheme="telegram" onClick={handleRegister}>
        Register
      </Button>
      <Button
        variant="ghost"
        onClick={() => {
          onSwitch();
          onClose();
        }}
      >
        Close
      </Button>
    </VStack>
  );
};

export default RegisterForm;
