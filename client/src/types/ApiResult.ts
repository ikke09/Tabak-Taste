import { TobaccoListType } from "./Tobacco";

type ApiResult = {
  status: number;
  error: string;
  data: TobaccoListType;
};

export default ApiResult;
