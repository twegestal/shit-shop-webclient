import React, { useState } from "react";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  HStack,
} from "@chakra-ui/react";

const PriceSlider = () => {
  const [values, setValues] = useState([0, 10000]);

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
        onChange={(values) => setValues(values)}
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
