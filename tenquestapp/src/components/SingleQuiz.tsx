import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Quiz } from "../features/api/quizSlice_Api";
import { categoryL } from "../features/quizzes/Quizzes";

type SingleQuizProp = {
  quiz: Quiz;
};

export default function SingleQuiz({ quiz }: SingleQuizProp) {
  return (
    <>
      <Box>
        <Typography variant="h1" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="h2" gutterBottom>
          {categoryL[quiz.category]}
        </Typography>
        {quiz.questions.map((questions) => (
          <>
            <Typography variant="h4" gutterBottom>
              {questions.text}
            </Typography>
            {questions.answers.map((answers) => (
              <Typography variant="h4" gutterBottom>
                {answers.answer}
              </Typography>
            ))}
          </>
        ))}
      </Box>
    </>
  );
}
