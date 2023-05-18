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

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SellProductModal: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [yearOfProduction, setYearOfProduction] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSellProduct = () => {
    // Handle the submission of the product here...
    console.log(
      name,
      productType,
      price,
      yearOfProduction,
      condition,
      color,
      imageUrl
    );

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
            productType={productType}
            setProductType={setProductType}
            price={price}
            setPrice={setPrice}
            yearOfProduction={yearOfProduction}
            setYearOfProduction={setYearOfProduction}
            condition={condition}
            setCondition={setCondition}
            color={color}
            setColor={setColor}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSellProduct}>
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
