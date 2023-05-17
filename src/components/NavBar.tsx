import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.jpeg";
import ColorModeSwitch from "./ColorModeSwitch";
import { EmailIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <HStack>
        <EmailIcon
          boxSize="40px"
          onClick={() => {
            navigate("/mail");
          }}
        />
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
