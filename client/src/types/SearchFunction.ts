import { TobaccoListType } from "./Tobacco";

type SearchFunctionType = (input: string) => Promise<TobaccoListType>;

export default SearchFunctionType;
