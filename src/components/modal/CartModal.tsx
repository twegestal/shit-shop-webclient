import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import CartCard from "../cards/CartCard";
import { PostData } from "../../services/PostData";
import { Product } from "../main/ProductCardGrid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  setCartItems: (items: Product[]) => void;
}

const CartModal = ({ isOpen, onClose, cartItems, setCartItems }: Props) => {
  const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleOrder = async () => {
    try {
      const cartData = localStorage.getItem("cartItems");
      if (cartData) {
        const cartItems = JSON.parse(cartData);
        await PostData({
          endpoint: "order",
          data: cartItems,
        });
        localStorage.removeItem("cartItems");
        setCartItems([]);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {cartItems.length === 0 ? (
            <Text>No items in the cart</Text>
          ) : (
            <VStack spacing={4}>
              {cartItems.map((item) => (
                <CartCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onDelete={() => removeItemFromCart(item.id)}
                />
              ))}
            </VStack>
          )}
          <Flex justify="space-between" mt={4}>
            <Text>Total: ${totalCost}</Text>
            <Button onClick={handleOrder}>Order</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
