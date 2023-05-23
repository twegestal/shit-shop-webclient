import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
} from "@chakra-ui/react";
import { Product } from "../main/ProductCardGrid";

interface Props {
  product: Product;
}

const OrderHistoryCard = ({ product }: Props) => {
  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <CardBody>
        <Image
          src={product.imageUrl}
          alt="Can't find image"
          borderRadius="lg"
          height="200px"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.name}</Heading>
          <Text>Type: {product.productType}</Text>
          <Text>Year: {product.yearOfProduction}</Text>
          <Text>Condition: {product.condition}</Text>
          <Text>Color: {product.color}</Text>
          <Text color="blue.600" fontSize="2xl">
            {"$" + product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default OrderHistoryCard;
