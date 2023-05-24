import { useEffect, useState } from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { FetchData } from "../../services/FetchData";
import { Order } from "../modal/PendingSalesModal";
import { Product } from "../main/ProductCardGrid";

interface Props {
  order: Order;
  updateMessages: () => void;
}

const PendingSalesCard = ({ order, updateMessages }: Props) => {
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

  const handleApprove = async () => {
    try {
      await FetchData({
        endpoint: "order",
        method: "PATCH",
        data: {
          buyer: order.buyer,
          product_id: order.productID,
          status: "APPROVED",
        },
      });
      console.log("Order approved:", order);
      updateMessages();
    } catch (error) {
      console.log("Error approving order:", error);
    }
  };

  const handleDecline = async () => {
    try {
      await FetchData({
        endpoint: "order",
        method: "PATCH",
        data: {
          buyer: order.buyer,
          product_id: order.productID,
          status: "DECLINED",
        },
      });
      console.log("Order declined:", order);
      updateMessages();
    } catch (error) {
      console.log("Error declining order:", error);
    }
  };

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
            <Flex mt={4}>
              <Button
                colorScheme="green"
                size="sm"
                mr={2}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button colorScheme="red" size="sm" onClick={handleDecline}>
                Decline
              </Button>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default PendingSalesCard;
