import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/nav/NavBar";
import SearchPanel from "./components/aside/SearchPanel";
import ProductCardGrid from "./components/main/ProductCardGrid";
import { Product } from "./components/main/ProductCardGrid";
import { useState, useEffect } from "react";

const App = () => {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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
          <SearchPanel />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <ProductCardGrid cartItems={cartItems} setCartItems={setCartItems} />
      </GridItem>
    </Grid>
  );
};

export default App;
