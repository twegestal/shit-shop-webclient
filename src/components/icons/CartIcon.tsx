import { HStack, Badge, Box, Icon } from "@chakra-ui/react";
import { TiShoppingCart } from "react-icons/ti";

interface Props {
  itemCount: number;
}

const CartIcon = ({ itemCount }: Props) => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={TiShoppingCart} boxSize={6} marginBottom={1} />
        {itemCount > 0 && (
          <Badge
            colorScheme="green"
            borderRadius="full"
            size="sm"
            position="absolute"
            top="-2px"
            right="-2px"
            fontSize="xs"
          >
            {itemCount}
          </Badge>
        )}
      </Box>
    </HStack>
  );
};

export default CartIcon;
