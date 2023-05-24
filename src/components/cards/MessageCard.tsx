import { Box, Text } from "@chakra-ui/react";
import { Message } from "../modal/MessageModal";

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
      <Text>{message.text}</Text>
    </Box>
  );
};

export default MessageCard;
