import React, { useState } from "react";
import { VStack, Button } from "@chakra-ui/react";
import PriceSlider from "./PriceSlider";
import ProductTypeMenu from "./ProductTypeMenu";
import { BsSearch } from "react-icons/bs";
import ConditionMenu from "./ConditionMenu";
import { Product } from "../main/ProductCardGrid";
import { PostData } from "../../services/PostData";
import ErrorAlert from "../error/AlertMessage";

interface Props {
  setSearchResults: React.Dispatch<React.SetStateAction<Product[]>>;
}

const SearchPanel: React.FC<Props> = ({ setSearchResults }) => {
  const [loading, setLoading] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(0);
  const [selectedMinCondition, setSelectedMinCondition] = useState("");
  const [selectedMaxCondition, setSelectedMaxCondition] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Add state for showing the alert

  const handleSearch = async () => {
    if (
      !selectedProductType ||
      !selectedMinCondition ||
      !selectedMaxCondition
    ) {
      // Validate that all required fields are selected
      setShowAlert(true); // Show the alert
      return;
    }

    try {
      setLoading(true);

      // Create the payload for the POST request
      const payload = {
        productType: selectedProductType,
        minPrice: selectedMinPrice,
        maxPrice: selectedMaxPrice,
        minCondition: selectedMinCondition,
        maxCondition: selectedMaxCondition,
      };

      // Make the POST request to the backend
      const response = await PostData({
        endpoint: "product/search",
        data: payload,
      });

      // Update the search results with the response
      setSearchResults(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
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
