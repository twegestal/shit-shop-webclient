import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
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

interface Props {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductCardGrid = ({ cartItems, setCartItems }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const addToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      // Check if the product is already in the cart
      const isProductInCart = prevCartItems.some(
        (item) => item.id === product.id
      );

      // If the product is not in the cart, add it
      if (!isProductInCart) {
        const updatedCartItems = [...prevCartItems, product];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      }

      // If the product is already in the cart, return the previous cart items
      return prevCartItems;
    });
  };

  useEffect(() => {
    GetData({
      endpoint: "product/",
      data: null,
    })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SimpleGrid columns={3} padding="10px" spacing={10}>
      {products.length === 0
        ? skeletons.map((skeleton) => <ProductCardSkeleton key={skeleton} />)
        : products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
    </SimpleGrid>
  );
};

export default ProductCardGrid;
