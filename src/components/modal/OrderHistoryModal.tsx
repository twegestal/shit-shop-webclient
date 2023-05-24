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
import OrderHistoryCard from "../cards/OrderHistoryCard";
import { Product } from "../main/ProductCardGrid";
import { FetchData } from "../../services/FetchData";

interface Order {
  buyer: string;
  orderID: string;
  orderedDate: string;
  processedDate: string;
  product: Product;
  status: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistoryModal = ({ isOpen, onClose }: Props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const handleSearch = async () => {
    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const payload = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    try {
      const ordersResponse = await FetchData({
        endpoint: "order/approved",
        method: "POST",
        data: payload,
      });

      if (ordersResponse && Array.isArray(ordersResponse)) {
        const productResponse = await FetchData({
          endpoint: "product/search",
          method: "POST",
          data: null,
        });

        if (productResponse && Array.isArray(productResponse)) {
          const productsMap = new Map<number, Product>();
          productResponse.forEach((product) => {
            productsMap.set(product.productID, product);
          });

          const ordersWithProducts = ordersResponse.map((order) => {
            const product = productsMap.get(order.productID);
            return {
              ...order,
              product,
            };
          });

          setOrders(ordersWithProducts);
          console.log(orders);
        }
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
            {orders.map((order) => (
              <OrderHistoryCard key={order.orderID} product={order.product} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderHistoryModal;
