import { FormEvent, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { categoryL } from "./Quizzes";
import { Typography, FormLabel, Button } from "@mui/material";
import {
  Quiz,
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../api/quizSlice_Api";

function EditQuizForm() {
  const { quizId } = useParams<{ quizId: string }>();
  console.log(quizId)
  const { data: quiz, isLoading } = useGetQuizQuery(quizId ?? "");
  const [editQuiz, setEditQuiz] = useState<Quiz |null>(null);
  const [PatchQuiz] = useUpdateQuizMutation();

 

  useEffect(()=>{
    if(quiz) setEditQuiz(quiz);
  }, [quiz])

  //adds quiz using api slice
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    if (editQuiz != null) PatchQuiz(editQuiz);
  };

  //handles change for title and category
  const handleOnChangeTC = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "category"
  ) => {
    switch (field) {
      case "title":
        if(!editQuiz)return ;
        const title = e.target.value;
        setEditQuiz({ ...editQuiz, title });
        break;
      case "category":
        if(!editQuiz)return ;
        const category = parseInt(e.target.value);
        setEditQuiz({ ...editQuiz, category });
        break;
      default:
        break;
    }
  };
  //handles change for questions
  const handleOnChangeQuestion = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qIndex: number
  ) => {
    if(!editQuiz)return ;
    const updatedQuestions = [...editQuiz.questions];
    updatedQuestions[qIndex] = {...updatedQuestions[qIndex], text: e.target.value}
    //updatedQuestions[qIndex].text = e.target.value;
    setEditQuiz({ ...editQuiz, questions: updatedQuestions });
  };

  //handles change for answers
  const handleOnChangeAnswer = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    qIndex: number,
    aIndex: number
  ) => {
    if(!editQuiz) return;
    const updatedQuestions = [...editQuiz.questions];

    const updatedAnswers = [...updatedQuestions[qIndex].answers];

    updatedAnswers[aIndex] = {...updatedAnswers[aIndex], answer: e.target.value};

    updatedQuestions[qIndex] = {...updatedQuestions[qIndex], answers: updatedAnswers};
    //updatedQuestions[qIndex].answers[aIndex].answer = e.target.value;
    setEditQuiz({ ...editQuiz, questions: updatedQuestions });
  };

  if (isLoading) return <p>Loading..</p>;
  if (!editQuiz) return <p>No Quiz found</p>;

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <TextField
        required
        id="outlined-required"
        value={editQuiz.title}
        onChange={(e) => handleOnChangeTC(e, "title")}
      />
      <TextField
        id="catagory-select"
        select
        value={editQuiz.category}
        label="Catagory"
        onChange={(e) => handleOnChangeTC(e, "category")}
        helperText="Please select your category"
      >
        {categoryL.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <div className="questions">
        {editQuiz.questions.map((q, qIndex) => (
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
              onChange={(e) => handleOnChangeQuestion(e, qIndex)}
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
                onChange={(e) => handleOnChangeAnswer(e, qIndex, aIndex)}
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

export default EditQuizForm;

// const { state } = useLocation();
// let quiz = {} as Quiz;
// if (state != undefined) {
//   quiz = state;
// }
