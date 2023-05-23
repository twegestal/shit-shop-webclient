import { useState, useEffect } from "react";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FetchData } from "../../services/FetchData";

interface Props {
  onProductTypeSelect: (selectedProductType: string) => void;
}

const ProductTypeMenu = ({ onProductTypeSelect }: Props) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    FetchData({
      endpoint: "product/types",
      method: 'GET',
      data: null,
    })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleProductTypeSelect = (productType: string) => {
    setSelectedItem(productType);
    onProductTypeSelect(productType);
  };

  return (
    <Menu>
      <MenuButton
        colorScheme="telegram"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        width="150px"
      >
        {selectedItem ? selectedItem : "Product type"}
      </MenuButton>
      <MenuList>
        {data.map((item, index) => (
          <MenuItem key={index} onClick={() => handleProductTypeSelect(item)}>
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ProductTypeMenu;
