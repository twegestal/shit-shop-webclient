import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Box,
} from "@chakra-ui/react";

interface SellProductFormProps {
  name: string;
  setName: (name: string) => void;
  productType: string;
  setProductType: (productType: string) => void;
  price: string;
  setPrice: (price: string) => void;
  yearOfProduction: string;
  setYearOfProduction: (yearOfProduction: string) => void;
  condition: string;
  setCondition: (condition: string) => void;
  color: string;
  setColor: (color: string) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

const SellProductForm: React.FC<SellProductFormProps> = ({
  name,
  setName,
  productType,
  setProductType,
  price,
  setPrice,
  yearOfProduction,
  setYearOfProduction,
  condition,
  setCondition,
  color,
  setColor,
  imageUrl,
  setImageUrl,
}) => {
  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Product Type</FormLabel>
        <Input
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Year of Production</FormLabel>
        <Input
          value={yearOfProduction}
          onChange={(e) => setYearOfProduction(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Condition</FormLabel>
        <Input
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        <Input value={color} onChange={(e) => setColor(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </FormControl>
    </Box>
  );
};

export default SellProductForm;
