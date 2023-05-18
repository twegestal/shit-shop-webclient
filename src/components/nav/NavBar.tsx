// NavBar.js
import {
  HStack,
  Image,
  VStack,
  Link,
  Button,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/logo.jpeg";
import ColorModeSwitch from "./ColorModeSwitch";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";
import SellProductModal from "../modal/SellProductModal";

const NavBar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    if (token) return;
    navigate("/login");
  };

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <HStack spacing={4}>
        <Button
          colorScheme="telegram"
          leftIcon={<GrAddCircle />}
          onClick={onOpen}
        >
          <Spacer />
          Sell product
        </Button>
        <VStack _hover={{ cursor: "pointer" }}>
          <FaRegUserCircle />
          <Link onClick={handleLogin}>Log in</Link>
        </VStack>
        <VStack _hover={{ cursor: "pointer" }}>
          <MdOutlineNotificationsNone
            onClick={() => {
              navigate("/mail");
            }}
          />
          <Link>Inbox</Link>
        </VStack>
        <VStack _hover={{ cursor: "pointer" }}>
          <TiShoppingCart />
          <Link>Cart</Link>
        </VStack>
        <ColorModeSwitch />
      </HStack>

      <SellProductModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};

export default NavBar;
