import { VStack, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeStack from "./ProductTypeMenu";
import { BsSearch } from "react-icons/bs";
import ConditionMenu from "./ConditionMenu";

const SearchPanel = () => {
  return (
    <VStack spacing="50px">
      <ProductTypeStack />
      <PriceSlider />
      <ConditionMenu />
      <Button colorScheme="telegram" leftIcon={<BsSearch />}>
        Search
      </Button>
    </VStack>
  );
};

export default SearchPanel;
