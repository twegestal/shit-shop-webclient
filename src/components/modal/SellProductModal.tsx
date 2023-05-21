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
import { PostData } from "../../services/PostData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SellProductModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [yearOfProduction, setYearOfProduction] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productType, setProductType] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");

  const handleSellProduct = async () => {
    // Check if all form fields are filled
    if (
      name &&
      price &&
      yearOfProduction &&
      imageUrl &&
      productType &&
      condition &&
      color
    ) {
      // Validate yearOfProduction and price
      const currentYear = new Date().getFullYear();
      const yearOfProductionNum = parseInt(yearOfProduction, 10);
      const priceNum = parseFloat(price);

      if (
        yearOfProductionNum >= 0 &&
        yearOfProductionNum <= currentYear &&
        priceNum >= 0
      ) {
        try {
          const data = {
            name,
            price: priceNum,
            yearOfProduction: yearOfProductionNum,
            imageUrl,
            productType,
            condition,
            color,
          };

          await PostData({ endpoint: "product", data });

          console.log("Product sold successfully!");

          setName("");
          setPrice("");
          setYearOfProduction("");
          setImageUrl("");
          setProductType("");
          setCondition("");
          setColor("");

          // Close the modal
          onClose();
        } catch (error) {
          console.log("An error occurred while selling the product:", error);
        }
      } else {
        // Show error message if validation fails
        console.log("Invalid year or price");
      }
    } else {
      // Show error message if any form field is empty
      console.log("Please fill all form fields");
    }
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
            productType={productType}
            setProductType={setProductType}
            condition={condition}
            setCondition={setCondition}
            color={color}
            setColor={setColor}
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
