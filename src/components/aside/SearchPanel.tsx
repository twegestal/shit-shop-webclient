import { VStack, Spacer, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeStack from "./ProductTypeMenu";
import ConditionStack from "./ConditionStack";
import { BsSearch } from "react-icons/bs";

const SearchPanel = () => {
  return (
    <VStack>
      <ProductTypeStack />
      <Spacer />
      <PriceSlider />
      <Spacer />
      <ConditionStack />
      <Spacer />
      <Button colorScheme="telegram" leftIcon={<BsSearch />}>
        <Spacer />
        Search
      </Button>
    </VStack>
  );
};

export default SearchPanel;
