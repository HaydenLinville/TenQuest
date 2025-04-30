import { ReactNode } from "react";
import SingleQuiz from "../../components/SingleQuiz";
import { Quiz, useGetQuizQuery } from "../api/quizSlice_Api";
import { useLocation } from "react-router-dom";

type PlayQuizProps = {
    quiz: Quiz;
};

export default function PlayQuiz({quiz}: PlayQuizProps) {
    useLocation

  var { data } = useGetQuizQuery(quiz.id);
  let content: ReactNode;
  if (data != undefined) {
    content = <SingleQuiz quiz={data}></SingleQuiz>;
  }

  return <>{content}</>;
}
