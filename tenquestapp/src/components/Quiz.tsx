import { Questions } from "./Questions";

//import React from "react";
export let catagory: string[] = [

    "Pop Culture",
    "History",
    "Science",
    "Literature",
    "Geography",
    "Music",
    "Video Games",
    "Food Drink",
    "Sports",
]


export type Quiz = {
  id: number;
  catagory: number;
  title: string;
  questions?: Questions[];
};
type QuizzesProps = {
  quizzes: Quiz[];
};

function Quizzes({ quizzes }: QuizzesProps) {
    
  return (
    <div>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{catagory[quiz.catagory]}</p>
        </div>
      ))}
    </div>
  );
}

export default Quizzes;
