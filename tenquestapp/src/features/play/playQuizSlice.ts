import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, Questions } from "../quizzes/ModelQuiz";

interface PlayState {
  level: number;
  hearts: number;
  timer: number;
  gameOn: boolean;
  questions: Questions[];
  currentQuestion: Questions;
}

const initialState: PlayState = {
  level: 0,
  hearts: 3,
  timer: 30,
  gameOn: false,
  questions: [
    {
      id: 0,
      text: "",
      answers: Array.from({ length: 4 }, () => ({ id: 0, answer: "" })),
      correctAnswer: { id: 0, answer: "" },
      hasBeenAsked: false,
    },
  ],
  currentQuestion: {
    id: 0,
    text: "",
    answers: Array.from({ length: 4 }, () => ({ id: 0, answer: "" })),
    correctAnswer: { id: 0, answer: "" },
    hasBeenAsked: false,
  },
};

function randomQuestion(questionArray: Questions[]) {
  //var foundFreashQuestion = false
  questionArray.forEach((questions: Questions) => {
    var rAnswerArray = randomArray<Answer>(questions.answers);
    questions.answers = rAnswerArray;
  });

  var newQuestionArray = randomArray<Questions>(questionArray);
  return newQuestionArray;
}

function randomArray<T>(array: Array<T>) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const playQuizSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    start(state, action: PayloadAction<Questions[]>) {
      state.questions = action.payload;
      var randomQArray = randomQuestion(action.payload);
      state.currentQuestion = randomQArray[state.level];
    },
    nextRound(state) {
      state.level++;
      state.timer = 30;
      state.currentQuestion = state.questions[state.level];
    },
    checkAnswer(state, action: PayloadAction<Answer>) {},
  },
});

export const { start } = playQuizSlice.actions;
export default playQuizSlice.reducer;
