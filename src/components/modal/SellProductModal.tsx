import { useState } from "react";
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
import { FetchData } from "../../services/FetchData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SellProductModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [yearOfProduction, setYearOfProduction] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productType, setProductType] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");

  const handleSellProduct = async () => {
    if (
      name &&
      price &&
      yearOfProduction &&
      imageUrl &&
      productType &&
      condition &&
      color
    ) {
      const currentYear = new Date().getFullYear();
      const yearOfProductionNum = parseInt(yearOfProduction, 10);
      const priceNum = parseFloat(price);

      if (
        yearOfProductionNum >= 0 &&
        yearOfProductionNum <= currentYear &&
        priceNum >= 0
      ) {
        try {
          let finalCondition = condition;
          if (condition === "VERY GOOD") {
            finalCondition = "VERY_GOOD";
          }
          const data = {
            name,
            price: priceNum,
            yearOfProduction: yearOfProductionNum,
            imageUrl,
            productType,
            condition: finalCondition,
            color,
          };

          console.log(data);

          await FetchData({
            endpoint: "product",
            method: "POST",
            data,
          });

          console.log("Product sold successfully!");

          setName("");
          setPrice("");
          setYearOfProduction("");
          setImageUrl("");
          setProductType("");
          setCondition("");
          setColor("");

          onClose();
        } catch (error) {
          console.log("An error occurred while selling the product:", error);
        }
      } else {
        //TODO we show the alert component here instead
        console.log("Invalid year or price");
      }
    } else {
      //TODO we show the alert component here instead
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
