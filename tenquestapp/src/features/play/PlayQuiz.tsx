import { ReactNode } from "react";
import SingleQuiz from "../../components/SingleQuiz";
import {  useGetQuizQuery } from "../api/quizSlice_Api";
import { useParams } from "react-router-dom";

export default function PlayQuiz() {
  const { quizId } = useParams<{ quizId: string }>();

  var { data: quiz, isLoading } = useGetQuizQuery(quizId ?? "");
  let content: ReactNode;
  if (isLoading) {
    content = <p>loading</p>;
  }
  if (quiz != undefined) {
    content = <SingleQuiz quiz={quiz}></SingleQuiz>;
  }

  return <>{content}</>;
}
