import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import useProducts, { Product } from "../../hooks/useProducts";
import { GetData } from "../../services/GetData";

const ProductCardGrid = () => {
  const [products, setProducts] = useState([]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    GetData({
      endpoint: "product/",
      data: null,
    })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => alert("fetch failed"));
  }, []);

  return (
    <SimpleGrid columns={3} padding="10px" spacing={10}>
      {products.map((product) => (
        <ProductCard key={product} product={product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductCardGrid;
