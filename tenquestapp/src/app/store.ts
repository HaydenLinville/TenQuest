import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/quizSlice_Api";
import playQuizReducer from "../features/play/playQuizSlice"
//import quizzesReducer from "../features/quizzes/quizSlice"

export const store = configureStore({
  reducer: {
    play: playQuizReducer,
    //quizzes: quizzesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
