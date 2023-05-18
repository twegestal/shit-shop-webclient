import { GetData } from "../../services/GetData";
import { useEffect, useState } from "react";
import { VStack, Text, Button } from "@chakra-ui/react";

const ConditionStack = () => {
  const [data, setData] = useState([]);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  useEffect(() => {
    GetData({
      endpoint: "product/condition",
      data: null,
    })
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (index: number) => {
    setLastSelected(index);
  };

  return (
    <VStack>
      <Text as="b">Condition</Text>
      {data.map((item, index) => (
        <Button
          key={index}
          colorScheme={
            lastSelected !== null && index <= lastSelected ? "blue" : "gray"
          }
          onClick={() => handleClick(index)}
        >
          {item}
        </Button>
      ))}
    </VStack>
  );
};

export default ConditionStack;
