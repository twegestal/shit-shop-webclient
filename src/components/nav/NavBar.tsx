import { useState } from "react";
import {
  HStack,
  Image,
  VStack,
  Link,
  Button,
  Spacer,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import logo from "../../assets/logo.jpeg";
import ColorModeSwitch from "./ColorModeSwitch";
import { FaRegUserCircle } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import SellProductModal from "../modal/SellProductModal";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import CartModal from "../modal/CartModal";
import { Product } from "../main/ProductCardGrid";
import CartIcon from "../icons/CartIcon";
import InboxIcon from "../icons/InboxIcon";

interface Props {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const NavBar = ({ cartItems, setCartItems }: Props) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const {
    isOpen: isSellProductOpen,
    onOpen: onSellProductOpen,
    onClose: onSellProductClose,
  } = useDisclosure();

  const handleLoginClose = () => {
    onLoginClose();
    onRegisterClose();
  };

  const handleSwitchToRegister = () => {
    onLoginClose();
    onRegisterOpen();
  };

  const token = localStorage.getItem("token");

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} boxSize="60px" />
      <HStack spacing={10}>
        {token && (
          <Button
            colorScheme="telegram"
            leftIcon={<GrAddCircle />}
            onClick={onSellProductOpen}
          >
            Sell product
          </Button>
        )}
        {!token && (
          <VStack _hover={{ cursor: "pointer" }} onClick={onLoginOpen}>
            <FaRegUserCircle />
            <Link>Login</Link>
          </VStack>
        )}
        {token && (
          <VStack _hover={{ cursor: "pointer" }}>
            <InboxIcon messageCount={0} />
            <Link>Inbox</Link>
          </VStack>
        )}
        {token && (
          <VStack
            _hover={{ cursor: "pointer" }}
            onClick={() => setCartOpen(true)}
          >
           <CartIcon itemCount={cartItems.length} />
            <Link>Cart</Link>
          </VStack>
        )}
        <ColorModeSwitch />
      </HStack>
      <SellProductModal
        isOpen={isSellProductOpen}
        onClose={onSellProductClose}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleLoginClose}
        onSwitch={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={handleLoginClose}
        onSwitch={onLoginOpen}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </HStack>
  );
};

export default NavBar;
