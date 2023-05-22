import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { GetData } from "../../services/GetData";

interface Props {
  onMinConditionSelect: (condition: string) => void;
  onMaxConditionSelect: (condition: string) => void;
}

const conditionsOrder = ["Defect", "Bad", "Good", "Very_Good", "New"]; // Conditions in the desired order

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
        const response = await GetData({
          endpoint: "product/condition",
          data: null,
        });
        // Sort the conditions based on the desired order
        const sortedConditions = conditionsOrder.filter((condition) =>
          response.includes(condition)
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
      conditionsOrder.indexOf(maxCondition) < conditionsOrder.indexOf(condition)
    ) {
      setMaxCondition(null);
    }

    onMinConditionSelect(condition); // Call the onMinConditionSelect prop
  };

  const handleMaxConditionSelect = (condition: string) => {
    setMaxCondition(condition);

    // If the min condition is already set and is greater than the selected max condition,
    // reset the min condition
    if (
      minCondition &&
      conditionsOrder.indexOf(minCondition) > conditionsOrder.indexOf(condition)
    ) {
      setMinCondition(null);
    }

    onMaxConditionSelect(condition); // Call the onMaxConditionSelect prop
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
                conditionsOrder.indexOf(maxCondition) < index
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
                conditionsOrder.indexOf(minCondition) > index
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
