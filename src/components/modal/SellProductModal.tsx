import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import SellProductForm from "../forms/SellProductForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SellProductModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [yearOfProduction, setYearOfProduction] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSellProduct = () => {
    // Handle the submission of the product here...

    // Close the modal
    onClose();
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sell a Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SellProductForm
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            yearOfProduction={yearOfProduction}
            setYearOfProduction={setYearOfProduction}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="telegram" mr={3} onClick={handleSellProduct}>
            Sell Product
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SellProductModal;
