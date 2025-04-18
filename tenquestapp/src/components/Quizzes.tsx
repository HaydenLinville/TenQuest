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
};

function Quizzes({ quizzes }: QuizzesProps) {
  return (
    <div>
      {quizzes.map((quiz) =>
        quiz.id !== undefined ? (
          <SelectActionCard
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
