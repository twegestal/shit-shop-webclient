import { useState, useEffect } from "react";
import { GetData } from "../../services/GetData";
import { Menu, Button, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Props {
  onProductTypeSelect: (selectedProductType: string) => void;
}

const ProductTypeMenu = ({ onProductTypeSelect }: Props) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    GetData({
      endpoint: "product/types",
      data: null,
    })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleProductTypeSelect = (productType: string) => {
    setSelectedItem(productType);
    onProductTypeSelect(productType); // Pass the selected product type to the parent component
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
