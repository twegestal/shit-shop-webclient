import React from "react";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useProducts, { Product } from "../../hooks/useProducts";

const CardGrid = () => {
  const products = useProducts();
  let id = 1;
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <SimpleGrid columns={3} padding="10px" spacing={10}>
      {skeletons.map((Skeleton) => (
        <ProductCardSkeleton key={Skeleton} />
      ))}
    </SimpleGrid>
  );
};

export default CardGrid;
