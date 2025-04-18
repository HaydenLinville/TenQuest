import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { categoryL } from "./Quizzes";
import { Typography, FormLabel, Button } from "@mui/material";
import { Quiz } from "./Quizzes";

type FormProp = {
  quiz: Quiz;
  handleSubmit: () => void;
  handleChangeAnswer: (qIndex: number, aIndex: number, value: string) => void;
  handleChangeQuestion: (qIndex: number, value: string) => void;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "category"
  ) => void;
};

function Form({
  quiz,
  handleSubmit,
  handleChangeAnswer,
  handleChangeQuestion,
  handleOnChange,
}: FormProp) {
  // const [quiz, setQuiz] = useState({
  //   title: "",
  //   category: 0,
  //   questions: Array.from({ length: 10 }, () => ({
  //     text: "",
  //     answers: ["", "", "", ""],
  //     correctAnswerIndex: 0,
  //   })),
  // });

  // const handleChangeQuestion = (qIndex: number, value: string) => {
  //   const updatedQuestions = [...quiz.questions];
  //   updatedQuestions[qIndex].text = value;

  //   setQuiz({ ...quiz, questions: updatedQuestions });
  // };

  // const handleChangeAnswer = (
  //   qIndex: number,
  //   aIndex: number,
  //   value: string
  // ) => {
  //   const updatedAnswers = [...quiz.questions];
  //   updatedAnswers[qIndex].answers[aIndex] = value;

  //   setQuiz({ ...quiz, questions: updatedAnswers });
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const url = "http://localhost:5114/Quiz/AddQuiz";
  //   post(url, quiz);
  // };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="outlined-required"
        label="Required"
        defaultValue="Quiz Title"
        onChange={(e) => handleOnChange(e, "title")}
      />
      <TextField
        id="catagory-select"
        select
        value={quiz.category}
        label="Catagory"
        onChange={(e) => handleOnChange(e, "category")}
        helperText="Please select your category"
      >
        {categoryL.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <div className="questions">
        {quiz.questions.map((q, qIndex) => (
          <Box
            key={qIndex}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 3,
              m: 1,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Typography variant="h6">Question {qIndex + 1}</Typography>

            <TextField
              fullWidth
              label="Question Text"
              variant="outlined"
              required
              value={q.text}
              onChange={(e) => handleChangeQuestion(qIndex, e.target.value)}
            />

            <FormLabel sx={{ fontWeight: 500, mt: 1 }}>Answers</FormLabel>

            {q.answers.map((a, aIndex) => (
              <TextField
                key={aIndex}
                fullWidth
                required
                variant="outlined"
                label={`Answer ${aIndex + 1}${
                  aIndex === 0 ? " (Correct)" : ""
                }`}
                value={a.answer}
                onChange={(e) =>
                  handleChangeAnswer(qIndex, aIndex, e.target.value)
                }
              />
            ))}
          </Box>
        ))}
      </div>
      <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
        Submit Quiz
      </Button>
    </Box>
  );
}

export default Form;
