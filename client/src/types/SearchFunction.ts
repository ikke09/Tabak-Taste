import type ApiResult from "./ApiResult";

type SearchFunctionType = (input: string) => Promise<ApiResult>;

export default SearchFunctionType;
