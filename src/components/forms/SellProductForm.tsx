import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, Input, Select, Box } from "@chakra-ui/react";
import { FetchData } from "../../services/FetchData";

interface Props {
  name: string;
  setName: (name: string) => void;
  price: string;
  setPrice: (price: string) => void;
  yearOfProduction: string;
  setYearOfProduction: (yearOfProduction: string) => void;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
  productType: string;
  setProductType: (productType: string) => void;
  condition: string;
  setCondition: (condition: string) => void;
  color: string;
  setColor: (color: string) => void;
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
  productType,
  setProductType,
  condition,
  setCondition,
  color,
  setColor,
}: Props) => {
  const [productTypes, setProductTypes] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    FetchData({
      endpoint: "product/condition",
      method: "GET",
      data: null,
    })
      .then((cond) => setConditions(cond))
      .catch((error) => console.log(error));

    FetchData({
      endpoint: "product/types",
      method: "GET",
      data: null,
    })
      .then((type) => setProductTypes(type))
      .catch((error) => console.log(error));

    FetchData({
      endpoint: "product/color",
      method: "GET",
      data: null,
    })
      .then((col) => setColors(col))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    if (selectedType) {
      setProductType(selectedType);
    }
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCondition = e.target.value;
    if (selectedCondition) {
      setCondition(selectedCondition);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    if (selectedColor) {
      setColor(selectedColor);
    }
  };

  return (
    <Box as="form">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl>
        <FormLabel>Product Type</FormLabel>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <Select
            value={productType}
            onChange={handleProductTypeChange}
            required
          >
            {productType ? null : (
              <option value="">Choose a product type</option>
            )}
            {productTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Select>
        )}
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
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <Select value={condition} onChange={handleConditionChange} required>
            {condition ? null : <option value="">Choose a condition</option>}
            {conditions.map((cond, index) => (
              <option key={index} value={cond}>
                {cond}
              </option>
            ))}
          </Select>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <Select value={color} onChange={handleColorChange} required>
            {color ? null : <option value="">Choose a color</option>}
            {colors.map((cond, index) => (
              <option key={index} value={cond}>
                {cond}
              </option>
            ))}
          </Select>
        )}
      </FormControl>

      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </FormControl>
    </Box>
  );
};

export default SellProductForm;
