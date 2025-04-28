import { ReactNode, useEffect, useState } from "react";
//import { Questions } from "../components/Questions";
import Quizzes from "../features/quizzes/Quizzes";
//import { deleteData, get } from "../util/http";
import {
  useDeleteQuizMutation,
  useGetQuizzesQuery,
} from "../features/api/quizSlice_Api";

function AllQuizzes() {
  const {
    data: quizzes = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetQuizzesQuery();

  const [deleteQuiz] = useDeleteQuizMutation();

  const handleDelete = async (id: string) => {
    deleteQuiz(id);
  };

  let content: ReactNode;
  if (quizzes) {
    content = <Quizzes handleDelete={handleDelete} quizzes={quizzes}></Quizzes>;
    console.log(quizzes);
  }

  return <div>{content}</div>;
}

export default AllQuizzes;
