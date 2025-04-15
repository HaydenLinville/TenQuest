import { Answer } from "./Answer";

export type Questions = {
id: number;
text: string;
answers: Answer[];
correctAnswer: Answer;
hasBeenAsked: boolean;
}