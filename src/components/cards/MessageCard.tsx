import { Box, Text, VStack } from "@chakra-ui/react";

export interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
}

interface Props {
  message: Message;
}

const MessageCard = ({ message }: Props) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      padding="4"
      backgroundColor="gray.100"
    >
      <Text fontWeight="bold">{message.sender}</Text>
      <Text>{message.content}</Text>
      <Text fontSize="sm" color="gray.500">
        {message.timestamp}
      </Text>
    </Box>
  );
};

export default MessageCard;
