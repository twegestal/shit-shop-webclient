import { AiOutlineHeart } from "react-icons/ai";
import { HStack, Box, Icon } from "@chakra-ui/react";

const WishListIcon = () => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={AiOutlineHeart} boxSize={6} marginBottom={1} />
      </Box>
    </HStack>
  );
};

export default WishListIcon;
