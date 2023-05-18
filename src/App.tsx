import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/nav/NavBar";
import SearchPanel from "./components/aside/SearchPanel";
import ProductCardGrid from "./components/main/ProductCardGrid";

const App = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"} marginBottom="40px">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>
          <SearchPanel />
        </GridItem>
      </Show>
      <GridItem area={"main"}>
        <ProductCardGrid />
      </GridItem>
    </Grid>
  );
};

export default App;
