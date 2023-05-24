import { useEffect, useState } from "react";
import { FetchData } from "../../services/FetchData";
import { Order } from "./PendingSalesModal";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import PendingPurchasesCard from "../cards/PendingPurchasesCard";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PendingPurchasesModal = ({isOpen, onClose}: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await FetchData({
          endpoint: "order",
          method: "GET",
          data: null,
        });
        const filteredOrders = response.filter(
          (order: Order) => order.status === "PENDING"
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.log(error);
      }
    };

    if (isOpen) {
        fetchOrders();
    }
  }, [isOpen]);
  return(
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Pending Purchases</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    {orders.map((order) => (
                        <PendingPurchasesCard 
                            key={order.orderID}
                            order={order}
                        />
                    ))}
                </VStack>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
};

export default PendingPurchasesModal;
