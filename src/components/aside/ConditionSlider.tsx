import * as React from "react";
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Text, HStack } from "@chakra-ui/react";

export const ConditionSlider = () => {
  const conditions = ["defect", "bad", "good", "very good", "new"];
  const [condition, setCondition] = React.useState(conditions[0]);

  return (
    <VStack width="100%" alignItems="center">
      <Slider 
        defaultValue={0}
        min={0} 
        max={4} 
        step={1}
        onChangeEnd={(value) => setCondition(conditions[value])}
        width="90%"
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="tomato" />
        </SliderThumb>
      </Slider>
      <HStack justifyContent="space-between" width="90%">
        {conditions.map((condition) => (
          <Text key={condition}>{condition}</Text>
        ))}
      </HStack>
    </VStack>
  )
}
