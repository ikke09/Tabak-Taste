import { Box, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import Theme from "./themes/8Bit_Theme";
import "./App.css";

import Title from "./components/Title";
import Search from "./components/Search";
import TobaccoList from "./components/TobaccoList";
import Footer from "./components/Footer";
import useDebouncedSearch from "./hooks/useDebouncedSearch";
import SearchProgress from "./components/SearchProgress";
import { TobaccoListType } from "./types/Tobacco";
import SearchFunctionType from "./types/SearchFunction";

function App() {
  const searchTobaccos: SearchFunctionType = async (filter: string) => {
    if (!filter || filter.length === 0) return [];

    const apiUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/tobaccos?search=${encodeURIComponent(filter)}`;
    const response = await fetch(apiUrl);

    if (response.status !== 200) {
      throw new Error("Search failed with Status " + response.status);
    }

    const json = (await response.json()) as TobaccoListType;
    return json;
  };

  const { inputText, setInputText, search } =
    useDebouncedSearch(searchTobaccos);

  return (
    <ThemeProvider theme={Theme}>
      <Box
        sx={{
          width: "100vw",
          height: "100%",
          backgroundColor: "primary.background",
        }}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="nowrap"
          style={{ minHeight: "100vh", maxWidth: "80%", marginLeft: "10%" }}
        >
          <Grid item xs={8}>
            <Title title="Tabak Taste" />
          </Grid>
          <Grid
            item
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ flexGrow: inputText === "" ? "0" : "1" }}
          >
            <Search
              data={inputText}
              handleChange={(event) => setInputText(event.target.value)}
              handleClear={() => setInputText("")}
            />
          </Grid>
          {search.loading && <SearchProgress />}
          {search.result && !!inputText && (
            <TobaccoList tobaccos={search.result} />
          )}
          <Footer />
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
