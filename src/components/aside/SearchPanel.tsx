import { VStack, Spacer, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeStack from "./ProductTypeMenu";
import ConditionStack from "./ConditionStack";
import { BsSearch } from "react-icons/bs";
import { ConditionSlider } from "./ConditionSlider";

const SearchPanel = () => {
  return (
    <VStack spacing="50px">
      <ProductTypeStack />
      <PriceSlider />
      <ConditionStack />
      <Button colorScheme="telegram" leftIcon={<BsSearch />}>
        Search
      </Button>
    </VStack>
  );
};

export default SearchPanel;
