import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Order } from "../modal/PendingSalesModal";
import { Product } from "../main/ProductCardGrid";
import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";

interface Props {
  order: Order;
}

const PendingPurchasesCard = ({ order }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await FetchData({
          endpoint: "product/search",
          method: "POST",
          data: null,
        });

        if (response && Array.isArray(response)) {
          const matchingProduct = response.find(
            (product) => product.productID === order.productID
          );
          setProduct(matchingProduct || null);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [order.productID]);
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      backgroundColor="gray.100"
    >
      <Flex align="center">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          boxSize="100px"
          objectFit="contain"
          marginRight="8px"
        />
        {product && (
          <Flex direction="column">
            <Text fontWeight="bold">{product.name}</Text>
            <Text>${product.price}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default PendingPurchasesCard;
