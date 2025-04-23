import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { Quiz } from "../../components/Quizzes";

const POST_URL = "http://localhost:5114/Quiz/AddQuiz";
const DELETE_URL = "http://localhost:5114/Quiz/DeleteQuiz/";
const GET_URL = "http://localhost:5114/Quiz/GetQuizzes";

export const fetchQuizzes = createAsyncThunk(
  "quizzes/fetchQuizzes",
  async () => {
    const response = await axios.get(GET_URL);
    return response.data;
  }
);

const initialState = {
  quizzes: [{}],
  status: "idle",
  error: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    reducer(state, action) {
      state.quizzes.push(action.payload);
    },
  },
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;

export default quizzesSlice.reducer;
