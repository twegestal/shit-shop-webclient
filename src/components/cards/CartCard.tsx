import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  image: string;
  name: string;
  price: number;
  onDelete: () => void;
}

const CartCard = ({ image, name, price, onDelete }: Props) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
      <Flex align="center" mb={2}>
        <Box flexShrink={0}>
          <img
            src={image}
            alt={name}
            style={{ height: "auto", width: "100px", marginRight: "8px" }}
          />
        </Box>
        <Flex flexDirection="column">
          <Text fontWeight="bold" mb={1}>
            {name}
          </Text>
          <Text>${price}</Text>
        </Flex>
        <Box ml="auto">
          <IconButton
            aria-label="Delete"
            icon={<RiDeleteBin6Line />}
            onClick={onDelete}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default CartCard;
