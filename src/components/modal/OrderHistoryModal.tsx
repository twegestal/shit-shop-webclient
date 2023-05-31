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
import { Order } from "./PendingSalesModal";
import AlertMessage from "../error/AlertMessage";

interface OrderHistory {
  order: Order;
  product: Product;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistoryModal = ({ isOpen, onClose }: Props) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSearch = async () => {
    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const payload = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    try {
      await FetchData({
        endpoint: "order/approved",
        method: "POST",
        data: payload,
      }).then((response) => {
        setOrders(response);
        setShowAlert(response.length === 0);
      });
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

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
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
              <OrderHistoryCard
                key={order.order.orderID}
                product={order.product}
              />
            ))}
            {showAlert && (
              <AlertMessage
                status="error"
                title="Nothing to show"
                description="You have no order history to show for the selected dates"
                onClose={handleAlertClose}
              />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default OrderHistoryModal;
