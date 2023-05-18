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
import { Product } from "./ProductCardGrid";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card width="300px" borderRadius={10} overflow={"hidden"}>
      <CardBody>
        <Image src={product.image} alt="Cant find image" borderRadius="lg" />
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
          <Button variant="solid" colorScheme="telegram">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

/*
id: number;
  image: string;
  name: string;
  productType: string;
  price: number;
  yearOfProduction: number;
  condition: string;
  color: string;
*/
