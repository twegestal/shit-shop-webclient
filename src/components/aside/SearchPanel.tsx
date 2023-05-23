import React, { useState } from "react";
import { VStack, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeMenu from "./ProductTypeMenu";
import { BsSearch } from "react-icons/bs";
import ConditionMenu from "./ConditionMenu";
import { Product } from "../main/ProductCardGrid";
import ErrorAlert from "../error/AlertMessage";
import { FetchData } from "../../services/FetchData";

interface Props {
  setSearchResults: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchPanel = ({ setSearchResults }: Props) => {
  const [loading, setLoading] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinCondition, setSelectedMinCondition] = useState("");
  const [selectedMaxCondition, setSelectedMaxCondition] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async () => {
    if (
      !selectedProductType ||
      !selectedMinCondition ||
      !selectedMaxCondition
    ) {
      setShowAlert(true);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        productType: selectedProductType,
        priceMin: selectedMinPrice,
        priceMax: selectedMaxPrice,
        conditionMin: selectedMinCondition,
        conditionMax: selectedMaxCondition,
      };

      console.log(payload);

      const response = await FetchData({
        endpoint: "product/search",
        method: "POST",
        data: payload,
      });
      console.log(response);

      setSearchResults(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <VStack spacing="50px">
      <ProductTypeMenu onProductTypeSelect={setSelectedProductType} />
      <PriceSlider
        onMinPriceSelect={setSelectedMinPrice}
        onMaxPriceSelect={setSelectedMaxPrice}
      />
      <ConditionMenu
        onMinConditionSelect={setSelectedMinCondition}
        onMaxConditionSelect={setSelectedMaxCondition}
      />
      <Button
        colorScheme="telegram"
        leftIcon={<BsSearch />}
        onClick={handleSearch}
        isLoading={loading}
        loadingText="Searching"
      >
        Search
      </Button>
      {showAlert && (
        <ErrorAlert
          status="error"
          title="Validation Error"
          description="Fill all fields"
          onClose={handleCloseAlert}
        />
      )}
    </VStack>
  );
};

export default SearchPanel;
