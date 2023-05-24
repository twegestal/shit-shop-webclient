import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
} from "@chakra-ui/react";
import { FetchData } from "../../services/FetchData";
import PendingSalesCard from "../cards/PendingSalesCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface Order {
  buyer: string;
  orderID: string;
  orderedDate: string;
  processedDate: string | null;
  productID: number;
  status: string;
}

const PendingSalesModal = ({ isOpen, onClose }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await FetchData({
          endpoint: "order/seller",
          method: "GET",
          data: null,
        });
        const filteredOrders = response.filter(
          (order: Order) => order.status === "PENDING"
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    if (isOpen || isUpdating) {
      fetchOrders();
    }
  }, [isOpen, isUpdating]);

  const updateMessages = () => {
    setIsUpdating((prev) => !prev);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pending Sales</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {orders.map((order) => (
              <PendingSalesCard
                key={order.orderID}
                order={order}
                updateMessages={updateMessages}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PendingSalesModal;
