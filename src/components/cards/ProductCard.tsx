import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { Product } from "../main/ProductCardGrid";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: Props) => {
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (token) {
      addToCart(product);
    }
  };

  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <CardBody>
        <Image
          src={product.imageUrl}
          alt="Can't find image"
          borderRadius="lg"
          height="200px"
          width="250px"
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
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="telegram"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
