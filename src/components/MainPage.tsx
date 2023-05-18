import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./NavBar";
import CardGrid from "./CardGrid";

const MainPage = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"}>Aside</GridItem>
      </Show>
      <GridItem area={"main"}>
        <CardGrid />
      </GridItem>
    </Grid>
  );
};

export default MainPage;
