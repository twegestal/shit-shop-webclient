import { useState, useEffect } from "react";
import { GetData } from "../../services/GetData";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const ProductTypeMenu = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    GetData({
      endpoint: "product/types",
      data: null,
    })
      .then((data) => {
        setData(data);
        setSelectedItem(data[0]);
      })
      .catch((error) => alert("fetch failed"));
  }, []);

  return (
    <Menu>
      <MenuButton
        colorScheme="telegram"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        {selectedItem}
      </MenuButton>
      <MenuList>
        {data.map((item, index) => (
          <MenuItem key={index} onClick={() => setSelectedItem(item)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProductTypeMenu;
