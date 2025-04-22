import SelectActionCard from "./Cards";
import { Questions } from "./Questions";

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

export type Quiz = {
  id?: number;
  category: number;
  title: string;
  questions: Questions[];
};

type QuizzesProps = {
  quizzes: Quiz[];
  handleDelete: (id: number)=>{}
};

function Quizzes({ quizzes, handleDelete }: QuizzesProps) {
  return (
    <div>
      {quizzes.map((quiz) =>
        quiz.id !== undefined ? (
          <SelectActionCard
           handleDelete={handleDelete}
            quiz = {quiz}
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
