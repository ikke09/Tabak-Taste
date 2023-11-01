import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { TobaccoProps } from "../types/Tobacco";

const TobaccoCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.secondary,
  border: `1px solid black`,
}));

const TasteChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.highlight,
  fontSize: "0.8rem",
}));

const Tobacco = ({ model }: TobaccoProps) => {
  return (
    <TobaccoCard
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "280px",
        maxHeight: "280px",
        minWidth: "280px",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <CardContent>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
            fontWeight="bold"
          >
            {model.name}
          </Typography>
          <Typography align="center" color="textPrimary" variant="h6">
            {model.producer}
          </Typography>
        </CardContent>
      </Box>
      <Divider color="black" />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {model.tastes.map((taste, index) => {
            return (
              <Grid
                key={index}
                item
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <TasteChip label={taste} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </TobaccoCard>
  );
};

export default Tobacco;
