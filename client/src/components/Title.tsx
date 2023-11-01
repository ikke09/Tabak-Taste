import { styled } from "@mui/system";
import TitleProps from "../types/TitleProps";

const StyledTitle = styled("h1")(({ theme }) => ({
  color: theme.palette.primary.title,
  WebkitTextStroke: `0.05rem black`,
  textStroke: `0.05rem black`,
  fontSize: "4rem",
  textAlign: "center",
}));

const Title = ({ title }: TitleProps) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
