import Card from "@mui/material/Card";
import { CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Quiz } from "../features/api/quizSlice_Api";
import ButtonRoute from "./ButtonRoute";
import { useNavigate } from "react-router-dom";
import CardC from "./CardC";

type CardQuizProp = {
  title: string;
  description: string;
  id: string;
  quiz: Quiz;
  handleDelete: (id: string) => {};
};

function CardQuiz({
  title,
  description,
  id,
  quiz,
  handleDelete,
}: CardQuizProp) {
  const nav = useNavigate();

  function handleClick() {
    console.log("works");
    nav(`quizzes/play/${quiz.id}`);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardC handleClick={handleClick} title={title} description={description}></CardC>
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
        <ButtonRoute to={`quizzes/edit/${quiz.id}`} role="button" data={quiz}>
          Edit
        </ButtonRoute>
      </CardActions>
    </Card>
  );
}

export default CardQuiz;
