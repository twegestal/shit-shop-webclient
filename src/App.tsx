import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/nav/NavBar";
import SearchPanel from "./components/aside/SearchPanel";
import ProductCardGrid, { Product } from "./components/main/ProductCardGrid";
import { useState, useEffect } from "react";
import PollingService from "./services/PollingService";
import { FetchData } from "./services/FetchData";

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const interval = 5000;

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        FetchData({
          endpoint: "message/unsent",
          method: "GET",
          data: null,
        })
          .then((response) => {
            console.log(response.hasUnsentMessages);
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      }
    }, interval);
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"} marginBottom="40px">
        <NavBar cartItems={cartItems} setCartItems={setCartItems} />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>
          <SearchPanel setSearchResults={setSearchResults} />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <ProductCardGrid
          cartItems={cartItems}
          setCartItems={setCartItems}
          searchResults={searchResults}
        />
      </GridItem>
    </Grid>
  );
};

export default App;
