import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

type SelectActionCardProp = {
  title: string;
  description: string;
};

function SelectActionCard({ title, description }: SelectActionCardProp) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      <Card>
        <CardActionArea
          sx={{
            height: "100%",
            backgroundColor: "#757575",
              "&:hover": {
                backgroundColor: "#616161",
            },
          }}
        >
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="#e0e0e0">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default SelectActionCard;
