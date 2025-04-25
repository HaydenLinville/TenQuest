import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Quiz } from "../features/api/quizSlice_Api";
import ButtonRoute from "./ButtonRoute";

type SelectActionCardProp = {
  title: string;
  description: string;
  id: number;
  quiz: Quiz;
  handleDelete: (id: number) => {};
};

// const handleDelete = async (id: number) => {
//   const deletedQuiz = await deleteData<Quiz>(
//     "http://localhost:5114/Quiz/DeleteQuiz/",
//     id
//   );
//   if (deletedQuiz) {
//     console.log("Deleted:", deletedQuiz.title);
//   }
// };

function SelectActionCard({
  title,
  description,
  id,
  quiz,
  handleDelete,
}: SelectActionCardProp) {
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
        <ButtonRoute to={"/customquiz"} role="button" data={quiz}>
          Edit
        </ButtonRoute>
      </CardActions>
    </Card>
  );
}

export default SelectActionCard;
