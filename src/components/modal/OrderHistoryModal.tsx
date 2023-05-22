import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { PostData } from "../../services/PostData";
import { GetData } from "../../services/GetData";
import OrderHistoryCard from "../cards/OrderHistoryCard";
import { Product } from "../main/ProductCardGrid";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistoryModal = ({ isOpen, onClose }: Props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = async () => {
    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const payload = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    try {
      const response = await PostData({
        endpoint: "order/history",
        data: payload,
      });

      // Handle the response
      console.log("Search Result:", response);

      if (response && Array.isArray(response)) {
        const productPromises = response.map(async (order) => {
          const productID = order.productID;
          const productResponse = await GetData({
            endpoint: `order/${productID}`,
            data: null,
          });

          // Handle the product response
          console.log("Product Result:", productResponse);
          return productResponse;
        });

        // Wait for all product requests to complete
        const products = await Promise.all(productPromises);
        console.log("Products:", products);
        setProducts(products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order History</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="telegram" onClick={handleSearch}>
              Search
            </Button>
            {products.map((product) => (
              <OrderHistoryCard key={product.id} product={product} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderHistoryModal;
