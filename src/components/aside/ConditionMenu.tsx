import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { FetchData } from "../../services/FetchData"

interface Props {
  onMinConditionSelect: (condition: string) => void;
  onMaxConditionSelect: (condition: string) => void;
}
 // Conditions in order, to be able to sort them
const conditionOrder = ["DEFECT", "GOOD", "VERY GOOD", "NEW"];

const ConditionMenu = ({
  onMinConditionSelect,
  onMaxConditionSelect,
}: Props) => {
  const [conditions, setConditions] = useState<string[]>([]);
  const [minCondition, setMinCondition] = useState<string | null>(null);
  const [maxCondition, setMaxCondition] = useState<string | null>(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await FetchData({
          endpoint: "product/condition",
          method: 'GET',
          data: null,
        });
        // Sort the conditions based on the order
        const sortedConditions = conditionOrder.filter((condition) =>
          response.includes(condition.toUpperCase())
        );
        setConditions(sortedConditions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConditions();
  }, []);

  const handleMinConditionSelect = (condition: string) => {
    setMinCondition(condition);

    // If the max condition is already set and is less than the selected min condition,
    // reset the max condition
    if (
      maxCondition &&
      conditionOrder.indexOf(maxCondition) < conditionOrder.indexOf(condition)
    ) {
      setMaxCondition(null);
    }

    onMinConditionSelect(condition);
  };

  const handleMaxConditionSelect = (condition: string) => {
    setMaxCondition(condition);

    // If the min condition is already set and is greater than the selected max condition,
    // reset the min condition
    if (
      minCondition &&
      conditionOrder.indexOf(minCondition) > conditionOrder.indexOf(condition)
    ) {
      setMinCondition(null);
    }

    onMaxConditionSelect(condition);
  };

  return (
    <div>
      <h2 style={{ marginTop: "1rem", fontWeight: "bold" }}>Min Condition</h2>
      <Menu>
        <MenuButton as={Button} colorScheme="telegram" width="150px">
          {minCondition ? minCondition : "Min Condition"}
        </MenuButton>
        <MenuList>
          {conditions.map((condition, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMinConditionSelect(condition)}
              isDisabled={
                maxCondition !== null &&
                conditionOrder.indexOf(maxCondition) < index
              }
            >
              {condition}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <h2 style={{ marginTop: "1rem", fontWeight: "bold" }}>Max Condition</h2>
      <Menu>
        <MenuButton as={Button} colorScheme="telegram" width="150px">
          {maxCondition ? maxCondition : "Max Condition"}
        </MenuButton>
        <MenuList>
          {conditions.map((condition, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMaxConditionSelect(condition)}
              isDisabled={
                minCondition !== null &&
                conditionOrder.indexOf(minCondition) > index
              }
            >
              {condition}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

export default ConditionMenu;
