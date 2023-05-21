import { AiOutlineHistory } from "react-icons/ai";
import { HStack, Box, Icon } from "@chakra-ui/react";

const OrderHistoryIcon = () => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={AiOutlineHistory} boxSize={6} marginBottom={1} />
      </Box>
    </HStack>
  );
};

export default OrderHistoryIcon;
