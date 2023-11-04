import { Box, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

import Theme from "./themes/8Bit_Theme";
import "./App.css";

import Title from "./components/Title";
import Search from "./components/Search";
import Footer from "./components/Footer";
import useDebouncedSearch from "./hooks/useDebouncedSearch";
import type SearchFunctionType from "./types/SearchFunction";
import ApiResult from "./types/ApiResult";
import Result from "./components/Result";

const AppBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  heigth: "100%",
  width: "100vw",
}));

const App = () => {
  const searchTobaccos: SearchFunctionType = async (filter: string) => {
    let result: ApiResult = {
      status: 400,
      error: "",
      data: [],
    };
    if (!filter || filter.length === 0) return result;

    const apiUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/tobaccos?search=${encodeURIComponent(filter)}`;
    const response = await fetch(apiUrl);

    if (response.status !== 200) {
      throw new Error("Search failed with Status " + response.status);
    }

    result = (await response.json()) as ApiResult;
    return result;
  };

  const { inputText, setInputText, search } =
    useDebouncedSearch(searchTobaccos);

  return (
    <ThemeProvider theme={Theme}>
      <AppBox>
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
            style={{ flexGrow: inputText ? "0" : "1" }}
          >
            <Search
              data={inputText}
              handleChange={(event) => setInputText(event.target.value)}
              handleClear={() => setInputText("")}
            />
          </Grid>
          {inputText && inputText !== "" && <Result result={search}></Result>}
          <Footer />
        </Grid>
      </AppBox>
    </ThemeProvider>
  );
};

export default App;
