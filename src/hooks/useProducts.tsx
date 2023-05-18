import { useState } from "react";

export interface Product {
  id: number;
  image: string;
  name: string;
  productType: string;
  price: number;
  yearOfProduction: number;
  condition: string;
  color: string;
}

interface FetchProducts {
  products: Product[];
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  return <></>;
};

export default useProducts;
