import React from "react";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";

const CardGrid = () => {
  return (
    <SimpleGrid
      column={{ sm: 1, md: 2, lg: 3, xl: 5 }}
      padding="10px"
      spacing={10}
    >
      <ProductCard />
    </SimpleGrid>
  );
};

export default CardGrid;
