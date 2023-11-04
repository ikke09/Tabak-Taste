import { UseAsyncReturn } from "react-async-hook";
import ApiResult from "./ApiResult";

type ResultProps = {
  result: UseAsyncReturn<ApiResult, [input: string]>;
};

export default ResultProps;
