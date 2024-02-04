import { styled } from '@mui/system';

type TitleProps = {
  title: string;
};

const StyledTitle = styled('h1')(({ theme }) => ({
  color: theme.palette.secondary.main,
  WebkitTextStroke: `0.05rem black`,
  textStroke: `0.05rem black`,
  fontSize: '4rem',
  textAlign: 'center',
}));

const Title = ({ title }: TitleProps) => {
  return <StyledTitle>{title}</StyledTitle>;
};

export default Title;
