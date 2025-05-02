export interface Quiz {
  id: number;
  title: string;
  category: number;
  questions: Questions[];
}

export interface Questions {
  id: number;
  text: string;
  answers: Answer[];
  correctAnswerIndex: string;
  hasBeenAsked: boolean;
}
export interface Answer {
  id: number;
  answer: string;
}

export interface QuizCreate {
  title: string;
  category: number;
  questions: QuestionsCreate[];
}

export interface QuestionsCreate {
  text: string;
  answers: AnswerCreate[];
}

export interface AnswerCreate {
  answer: string;
}
