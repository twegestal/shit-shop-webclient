import React from "react";
import { GetData } from "../../services/GetData";
import { useEffect, useState } from "react";
import { VStack, Text } from "@chakra-ui/react";

const ConditionStack = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetData({
      endpoint: "product/condition",
      data: null,
    })
      .then((data) => setData(data))
      .catch((error) => alert("fetch failed"));
  }, []);

  return (
    <VStack>
      {data.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </VStack>
  );
};

export default ConditionStack;
