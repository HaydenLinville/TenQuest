import { Answer } from "./Answer";

export type Questions = {
id: number;
text: string;
answers: Answer[];
correctAnswer: number;
hasBeenAsked: boolean;
}