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
import MessageCard from "../cards/MessageCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export interface Message {
  messageType: string;
  productID: number;
  text: string;
}

const MessageModal = ({ isOpen, onClose }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await FetchData({
          endpoint: "message",
          method: "GET",
          data: null,
        });
        setMessages(response.reverse());
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Messages</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            {messages.map((message) => (
              <MessageCard message={message} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
