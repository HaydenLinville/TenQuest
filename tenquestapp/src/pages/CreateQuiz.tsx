import { useState } from "react";
import Form from "../features/quizzes/Form";
import { Quiz } from "../features/api/quizSlice_Api";
import { post } from "../util/http";

type CustomQuizProps = {
  editQuiz: Quiz;
};

function CustomQuiz({ editQuiz }: CustomQuizProps) {
  // const [quiz, setQuiz] = useState<Quiz>({
  //   id: 0,
  //   title: "",
  //   category: 0,
  //   questions: Array.from({ length: 10 }, () => ({
  //     id: 0,
  //     text: "",
  //     answers: [{ answer: "" }, { answer: "" }, { answer: "" }, { answer: "" }],
  //     correctAnswerIndex: 0,
  //     hasBeenAsked: false,
  //   })),
  // });
  const [quiz, setQuiz] = useState<Quiz>(editQuiz);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: "title" | "category"
  ) => {
    const value =
      field === "category" ? parseInt(e.target.value) : e.target.value;
    setQuiz({ ...quiz, [field]: value });
  };

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
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].answers[aIndex].answer = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = "http://localhost:5114/Quiz/AddQuiz";
    await post(url, quiz);
  };

  return (
    <div>
      <Form
        quiz={quiz}
        handleChangeAnswer={handleChangeAnswer}
        handleChangeQuestion={handleChangeQuestion}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CustomQuiz;
