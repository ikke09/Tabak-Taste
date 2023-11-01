import { useState } from "react";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import SearchFunctionType from "../types/SearchFunction";

// https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
export default function useDebouncedSearch(searchFunction: SearchFunctionType) {
  const [inputText, setInputText] = useState("");

  const debouncedSearch = useConstant(() =>
    AwesomeDebouncePromise(searchFunction, 300)
  );

  const search = useAsync(debouncedSearch, [inputText]);

  return {
    inputText,
    setInputText,
    search,
  };
}
