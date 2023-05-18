import {
  HStack,
  Image,
  Text,
  VStack,
  Link,
  Button,
  Spacer,
} from "@chakra-ui/react";
import logo from "../assets/logo.jpeg";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MdOutlineNotificationsNone,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) return;
    navigate("/login");
  };

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <HStack>
        <Button colorScheme="telegram" leftIcon={<GrAddCircle />}>
          <Spacer />
          Sell product
        </Button>
        <Spacer />
        <VStack _hover={{ cursor: "pointer" }}>
          <BsSearch />
          <Link>Search</Link>
        </VStack>
        <Spacer />
        <VStack _hover={{ cursor: "pointer" }}>
          <FaRegUserCircle />
          <Link onClick={handleLogin}>Log in</Link>
        </VStack>
        <Spacer />
        <VStack _hover={{ cursor: "pointer" }}>
          <MdOutlineNotificationsNone
            onClick={() => {
              navigate("/mail");
            }}
          />
          <Link>Inbox</Link>
        </VStack>
        <Spacer />
        <VStack _hover={{ cursor: "pointer" }}>
          <TiShoppingCart />
          <Link>Cart</Link>
        </VStack>
        <Spacer />
        <ColorModeSwitch />
        <Spacer />
      </HStack>
    </HStack>
  );
};

export default NavBar;
