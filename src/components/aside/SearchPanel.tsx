import React, { useState, useEffect } from "react";
import { GetData } from "../../services/GetData";
import { VStack, Text, Spacer, RangeSlider, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeStack from "./ProductTypeMenu";
import ConditionStack from "./ConditionStack";

const SearchPanel = () => {
  return (
    <VStack>
      <ProductTypeStack />
      <Spacer />
      <PriceSlider />
      <Spacer />
      <ConditionStack />
      <Spacer />
      <Button colorScheme="telegram">Search</Button>
    </VStack>
  );
};

export default SearchPanel;
