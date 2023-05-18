import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { GetData } from "../../services/GetData";

export interface Product {
  id: number;
  image: string;
  name: string;
  productType: string;
  price: number;
  yop: number;
  condition: string;
  color: string;
}

const ProductCardGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    GetData({
      endpoint: "product/",
      data: null,
    })
      .then((data: Product[]) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SimpleGrid columns={3} padding="10px" spacing={10}>
      {products.length === 0
        ? skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </SimpleGrid>
  );
};

export default ProductCardGrid;
