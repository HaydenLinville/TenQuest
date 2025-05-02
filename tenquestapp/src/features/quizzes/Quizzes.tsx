import CardQuiz from "../../components/CardQuiz";
import SelectActionCard from "../../components/CardQuiz";
import { Quiz } from "../api/quizSlice_Api";

//import React from "react";
export let categoryL: string[] = [
  "Pop Culture",
  "History",
  "Science",
  "Literature",
  "Geography",
  "Music",
  "Video Games",
  "Food Drink",
  "Sports",
];

// export type Quiz = {
//   id?: number;
//   category: number;
//   title: string;
//   questions: Questions[];
// };

type QuizzesProps = {
  quizzes: Quiz[];
  handleDelete: (id: string) => {};
};

function Quizzes({ quizzes, handleDelete }: QuizzesProps) {
  return (
    <div>
      {quizzes.map((quiz) =>
        quiz.id !== undefined ? (
          <CardQuiz
            handleDelete={handleDelete}
            quiz={quiz}
            key={quiz.id}
            id={quiz.id}
            title={quiz.title}
            description={categoryL[quiz.category]}
          />
        ) : null
      )}
    </div>
  );
}

export default Quizzes;
