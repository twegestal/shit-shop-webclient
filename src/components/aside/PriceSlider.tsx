import { useState } from "react";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  HStack,
} from "@chakra-ui/react";

interface Props {
  onMinPriceSelect: (minPrice: number) => void;
  onMaxPriceSelect: (maxPrice: number) => void;
}

const PriceSlider: React.FC<Props> = ({
  onMinPriceSelect,
  onMaxPriceSelect,
}) => {
  const [values, setValues] = useState([0, 10000]);

  const handlePriceSelect = (values: number[]) => {
    const [minPrice, maxPrice] = values;
    onMinPriceSelect(minPrice); // Pass the selected min price to the parent component
    onMaxPriceSelect(maxPrice); // Pass the selected max price to the parent component
    setValues(values); // Update the local state
  };

  return (
    <Box>
      <Text as="b">Price</Text>
      <HStack justifyContent="space-between">
        <Text width="95px">Min: ${values[0]}</Text>
        <Text width="95px">Max: ${values[1]}</Text>
      </HStack>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[0, 10000]}
        min={0}
        max={10000}
        onChange={handlePriceSelect}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
};

export default PriceSlider;
