import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Box,
} from "@chakra-ui/react";
import { GetData } from "../../services/GetData";

interface Props {
  name: string;
  setName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  yearOfProduction: string;
  setYearOfProduction: (yearOfProduction: string) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

const SellProductForm = ({
  name,
  setName,
  price,
  setPrice,
  yearOfProduction,
  setYearOfProduction,
  imageUrl,
  setImageUrl,
}: Props) => {
  const [productType, setProductType] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    GetData({
      endpoint: "product/condition",
      data: null,
    })
      .then((cond) => setConditions(cond))
      .catch((error) => console.log(error));

    GetData({
      endpoint: "product/types",
      data: null,
    })
      .then((type) => setProductTypes(type))
      .catch((error) => console.log(error));

    GetData({
      endpoint: "product/color",
      data: null,
    })
      .then((col) => setColors(col))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Product Type</FormLabel>
        <Select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          {productTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
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
        <Select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          {conditions.map((cond, index) => (
            <option key={index} value={cond}>
              {cond}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        <Select value={color} onChange={(e) => setColor(e.target.value)}>
          {colors.map((cond, index) => (
            <option key={index} value={cond}>
              {cond}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </FormControl>
    </Box>
  );
};

export default SellProductForm;
