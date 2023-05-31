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
import { Product } from "../main/ProductCardGrid";
import { FetchData } from "../../services/FetchData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  setCartItems: (items: Product[]) => void;
}

const CartModal = ({ isOpen, onClose, cartItems, setCartItems }: Props) => {
  const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);

  const removeItemFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.productID !== id));
  };

  const handleOrder = async () => {
    try {
      const cartData = localStorage.getItem("cartItems");
      const productIDs = cartItems.map((item: Product) => item.productID);
      if (cartData) {
        await FetchData({
          endpoint: "order",
          method: "POST",
          data: productIDs,
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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
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
                  key={item.productID}
                  image={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  onDelete={() => removeItemFromCart(item.productID)}
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
