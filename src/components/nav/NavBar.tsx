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
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { TiShoppingCart } from "react-icons/ti";
import SellProductModal from "../modal/SellProductModal";
import LoginModal from "../modal/LoginModal";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const token = localStorage.getItem("token");

  const handleAction = () => {
    if (!token) {
      onLoginOpen();
    } else {
      onOpen();
    }
  };

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <HStack spacing={4}>
        <Button
          colorScheme="telegram"
          leftIcon={<GrAddCircle />}
          onClick={handleAction}
        >
          <Spacer />
          Sell product
        </Button>
        {!token && (
          <VStack _hover={{ cursor: "pointer" }} onClick={onLoginOpen}>
            <FaRegUserCircle />
            <Link>Login</Link>
          </VStack>
        )}
        <VStack _hover={{ cursor: "pointer" }} onClick={handleAction}>
          <MdOutlineNotificationsNone />
          <Link>Inbox</Link>
        </VStack>
        <VStack _hover={{ cursor: "pointer" }} onClick={handleAction}>
          <TiShoppingCart />
          <Link>Cart</Link>
        </VStack>
        <ColorModeSwitch />
      </HStack>
      <SellProductModal isOpen={isOpen} onClose={onClose} />
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
};

export default NavBar;
