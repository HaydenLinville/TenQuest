import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteData } from "../util/http";
import { Quiz } from "./Quizzes";

type SelectActionCardProp = {
  title: string;
  description: string;
  id: number;
};

const handleDelete = async (id: number) => {
  const deletedQuiz = await deleteData<Quiz>(
    "http://localhost:5114/Quiz/DeleteQuiz/",
    id
  );
  if (deletedQuiz) {
    console.log("Deleted:", deletedQuiz.title);
  }
};

function SelectActionCard({ title, description, id }: SelectActionCardProp) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          onClick={() => {
            handleDelete(id);
          }}
          aria-label="delete"
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default SelectActionCard;
