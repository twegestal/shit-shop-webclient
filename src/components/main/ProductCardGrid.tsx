import React, { useEffect, useState } from "react";
import ProductCard from "../cards/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { FetchData } from "../../services/FetchData";
import AlertMessage from "../error/AlertMessage";

export interface Product {
  color: string;
  condition: string;
  imageUrl: string;
  name: string;
  price: number;
  productID: number;
  productType: string;
  yearOfProduction: number;
}

interface Props {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  searchResults: Product[];
}

const ProductCardGrid = ({ setCartItems, searchResults }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);

  const addToCart = (product: Product) => {
    setCartItems((prevCartItems) => {
      const isProductInCart = prevCartItems.some(
        (item) => item.productID === product.productID
      );

      if (!isProductInCart) {
        const updatedCartItems = [...prevCartItems, product];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems;
      }

      return prevCartItems;
    });
  };

  useEffect(() => {
    if (!first && searchResults.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      setProducts(searchResults);
    }
  }, [searchResults]);

  useEffect(() => {
    if (first) {
      FetchData({
        endpoint: "product/search",
        method: "POST",
        data: null,
      })
        .then((data: Product[]) => {
          console.log(data);
          setProducts(data);
          setFirst(false);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <>
      {showAlert && (
        <AlertMessage
          status="info"
          title="No matching products"
          description="There are no products that match your search criteria."
          onClose={() => setShowAlert(false)}
        />
      )}
      <SimpleGrid columns={3} padding="10px" spacing={10}>
        {products.length === 0
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.productID}
                product={product}
                addToCart={addToCart}
              />
            ))}
      </SimpleGrid>
    </>
  );
};

export default ProductCardGrid;
