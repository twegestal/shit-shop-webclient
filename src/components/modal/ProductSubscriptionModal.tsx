import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import ProductTypeMenu from "../aside/ProductTypeMenu";
import { FetchData } from "../../services/FetchData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProductSubscriptionsModal = ({ isOpen, onClose }: Props) => {
  const [selectedProductType, setSelectedProductType] = useState("");

  const handleProductTypeSelect = (selectedProductType: string) => {
    setSelectedProductType(selectedProductType);
  };

  const handleSubscribe = async () => {
    if (selectedProductType) {
      try {
        await FetchData({
          endpoint: `product/subscribe/${selectedProductType}`,
          method: 'POST',
          data: null,
        });

        onClose(); // Close the modal
      } catch (error) {
        console.log("An error occurred:", error);
      }
    } else {
      console.log("Please select a product type");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Subscriptions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <ProductTypeMenu onProductTypeSelect={handleProductTypeSelect} />
            <Button colorScheme="teal" onClick={handleSubscribe}>
              Subscribe
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductSubscriptionsModal;
