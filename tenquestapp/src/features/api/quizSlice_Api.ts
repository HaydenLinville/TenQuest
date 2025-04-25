import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASELINE = "http://localhost:5114/Quiz";
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
  correctAnswerIndex: number;
  hasBeenAsked: boolean;
}
export interface Answer {
  answer: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASELINE,
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => "/GetQuizzes",
    }),
    createQuiz: builder.mutation<void, Quiz>({
      query: (quiz) => ({
        url: `/AddQuiz`,
        method: "POST",
        body: quiz,
      }),
    }),
    updateQuiz: builder.mutation<void, { id: number; quiz: Quiz }>({
      query: ({ id, quiz }) => ({
        url: `/UpdateQuiz/${id}`,
        method: "PATCH",
        body: quiz,
      }),
    }),
    deleteQuiz: builder.mutation<void, number>({
      query: (id) => ({
        url: `/DeleteQuiz/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetQuizzesQuery, useCreateQuizMutation, useDeleteQuizMutation, useUpdateQuizMutation } = apiSlice;

