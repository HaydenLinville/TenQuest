import { CardContent, Typography } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";

type CardCProp = {
  title: string;
  description: string;
  handleClick: () => void;
};

export default function CardC({ title, description, handleClick }: CardCProp) {
  return (
    <CardActionArea onClick={handleClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
}
