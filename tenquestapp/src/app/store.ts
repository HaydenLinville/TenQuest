import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "../features/quizzes/quizSlice"

export const store= configureStore({
    reducer:{
        quizzes: quizzesReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;