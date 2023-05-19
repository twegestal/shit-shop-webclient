import { GetData } from "../../services/GetData";
import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  Button,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const ConditionStack = () => {
  const [data, setData] = useState([]);
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  const [reverse, setReverse] = useState(false);

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

  const handleReverse = () => {
    setLastSelected(null);
    setReverse(!reverse);
  };

  return (
    <VStack>
      <Text as="b">Condition</Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="reverse-switch" mb="0">
          Reverse
        </FormLabel>
        <Switch id="reverse-switch" onChange={handleReverse} />
      </FormControl>
      {data.map((item, index) => (
        <Button
          key={index}
          colorScheme={
            lastSelected !== null &&
            (reverse ? index >= lastSelected : index <= lastSelected)
              ? "telegram"
              : "gray"
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
