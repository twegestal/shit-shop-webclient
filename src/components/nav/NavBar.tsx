import { useState } from "react";
import {
  HStack,
  Image,
  VStack,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/shit-shop-logo.png";
import ColorModeSwitch from "./ColorModeSwitch";
import { GrAddCircle } from "react-icons/gr";
import SellProductModal from "../modal/SellProductModal";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import CartModal from "../modal/CartModal";
import { Product } from "../main/ProductCardGrid";
import CartIcon from "../icons/CartIcon";
import InboxIcon from "../icons/InboxIcon";
import AccountMenu from "./AccountMenu";
import AccountIcon from "../icons/AccountIcon";
import MessageModal from "../modal/MessageModal";

interface Props {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const NavBar = ({ cartItems, setCartItems }: Props) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleSignOut = () => {
    localStorage.clear();
    setTimeout(onClose, 0);
  };

  const token = localStorage.getItem("token");

  return (
    <HStack justifyContent="space-between" padding="10px">
      <Image src={logo} blockSize={70} />
      <HStack spacing={10}>
        {token && (
          <Button
            size={"lg"}
            colorScheme="telegram"
            leftIcon={<GrAddCircle />}
            onClick={onSellProductOpen}
          >
            Sell product
          </Button>
        )}
        {!token && (
          <VStack _hover={{ cursor: "pointer" }} onClick={onLoginOpen}>
            <AccountIcon />
            <Link>Login</Link>
          </VStack>
        )}
        {token && (
          <VStack
            _hover={{ cursor: "pointer" }}
            onClick={() => setMessageOpen(true)}
          >
            <InboxIcon messageCount={0} />
            <Link>Messages</Link>
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
        {token && (
          <VStack _hover={{ cursor: "pointer" }} onClick={onOpen}>
            <AccountMenu
              isOpen={isOpen}
              onClose={onClose}
              onSignOut={handleSignOut}
            />
            <Link>Account</Link>
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
      <MessageModal
        isOpen={isMessageOpen}
        onClose={() => setMessageOpen(false)}
      />
    </HStack>
  );
};

export default NavBar;
