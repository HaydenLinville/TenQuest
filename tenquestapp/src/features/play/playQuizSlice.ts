import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Answer, Questions } from "../api/quizSlice_Api";

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
      id: "",
      text: "",
      answers: Array.from({ length: 4 }, () => ({ id: "", answer: "" })),
      correctAnswerIndex: "",
      hasBeenAsked: false,
    },
  ],
  currentQuestion: 
    {
      id: "",
      text: "",
      answers: Array.from({ length: 4 }, () => ({ id: "", answer: "" })),
      correctAnswerIndex: "",
      hasBeenAsked: false,
    }
};

function randomQuestion(questionArray: Questions[]) {
    var foundFreashQuestion = false;
    
    while (!foundFreashQuestion){
        var randomNumbQuestion = Math.floor(Math.random()* questionArray.length);
        var singleQuestion = questionArray[randomNumbQuestion];
        if(!singleQuestion.hasBeenAsked){
            singleQuestion.answers
            singleQuestion.hasBeenAsked = true;
            foundFreashQuestion = true;
            return singleQuestion
        }
    }
}
function randomAnswer(answerArray: Answer[]){
    let i = answerArray.length -1;
    for(; i> 0; i--){
        const j = Math.floor(Math.random() *(i+1));
        const temp = answerArray[i];
        answerArray[i] = answerArray[j];
        answerArray[j] = temp;
    }
    return answerArray;
}

const playQuizSlice = createSlice({
  name: "play",
  initialState,
  reducers: {
    start(state, action: PayloadAction<PlayState>) {
        state.gameOn = true;
        

    },
    questionsRandom(state, action: PayloadAction<Questions[]>) {
      state.questions = action.payload;
      var randomQ = randomQuestion(action.payload)
      if (randomQ != undefined) state.currentQuestion = randomQ;
      

    },
  },
});

export const { questionsRandom } = playQuizSlice.actions;
export default playQuizSlice.reducer;
