import { ReactNode, useEffect, useState } from "react";
import { Questions } from "../components/Questions";
import Quizzes, { Quiz } from "../components/Quizzes";
import { deleteData, get } from "../util/http";

type RawQuizData = {
  id: number;
  category: number;
  title: string;
  questions: Questions[];
};

function AllQuizzes() {
  const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>();

  useEffect(() => {
    async function fetchQuizzes() {
      const data = (await get(
        "http://localhost:5114/Quiz/GetQuizzes"
      )) as RawQuizData[];

      const quizzes: Quiz[] = data.map((rawData) => {
        return {
          id: rawData.id,
          category: rawData.category,
          title: rawData.title,
          questions: rawData.questions,
        };
      });

      setFetchedQuizzes(quizzes);
    }

    fetchQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    const deletedQuiz = await deleteData<Quiz>(
      "http://localhost:5114/Quiz/DeleteQuiz/",
      id
    );
    if (deletedQuiz) {
      console.log("Deleted:", deletedQuiz.title);
      setFetchedQuizzes((fetchedQuizzes) => {
        if (fetchedQuizzes!) return fetchedQuizzes.filter((item) => item.id !== id);
      });
    }
  };
  //trying to reload fetched Quizzes onces deleted

  let content: ReactNode;
  if (fetchedQuizzes) {
    content = (
      <Quizzes handleDelete={handleDelete} quizzes={fetchedQuizzes}></Quizzes>
    );
  }

  return <div>{content}</div>;
}

export default AllQuizzes;
