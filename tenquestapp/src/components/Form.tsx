import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { category } from "./Quiz";
import { useState } from "react";
import { Typography, FormLabel, Button } from "@mui/material";

function Form() {
  const [quiz, setQuiz] = useState({
    title: "",
    sCategory: 0,
    questions: Array.from({ length: 10 }, () => ({
      text: "",
      answers: ["", "", "", ""],
      correctAnswerIndex: 0,
    })),
  });

  const handleChangeQuestion = (qIndex: number, value: string) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].text = value;

    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleChangeAnswer = (
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    const updatedAnswers = [...quiz.questions];
    updatedAnswers[qIndex].answers[aIndex] = value;

    setQuiz({ ...quiz, questions: updatedAnswers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:5114/Quiz/AddQuiz";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    };
    fetch(url, requestOptions)
      .then(() => console.log("Submitted successfully"))
      .catch((error) => console.log("Form submit error", error));
  };

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
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <TextField
        id="catagory-select"
        select
        label="Catagory"
        //value={quiz.category}
        //onChange={(e) => setQuiz({ ...quiz, sCategory: e.target.value })}
        onChange={(e) => {
          setQuiz({ ...quiz, sCategory: parseInt(e.target.value) });
        }}
        helperText="Please select your category"
      >
        {category.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      {quiz.questions.map((q, qIndex) => (
        <Box
          key={qIndex}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 2,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
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

          {q.answers.map((answer, aIndex) => (
            <TextField
              key={aIndex}
              fullWidth
              required
              variant="outlined"
              label={`Answer ${aIndex + 1}${aIndex === 0 ? " (Correct)" : ""}`}
              value={answer}
              onChange={(e) =>
                handleChangeAnswer(qIndex, aIndex, e.target.value)
              }
            />
          ))}
        </Box>
      ))}

      <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
        Submit Quiz
      </Button>
    </Box>
  );
}

export default Form;
