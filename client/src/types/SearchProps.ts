import { ChangeEvent } from "react";

type SearchProps = {
  data: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
};

export default SearchProps;
