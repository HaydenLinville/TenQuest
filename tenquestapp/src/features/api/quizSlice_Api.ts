import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Quiz, QuizCreate } from "../quizzes/ModelQuiz";

const BASELINE = "http://localhost:5114/Quiz";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASELINE,
  }),
  tagTypes: ["Quizzes"],
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => "/GetQuizzes",
      providesTags: ["Quizzes"],
    }),
    getQuiz: builder.query<Quiz, string>({
      query: (id) => `/GetQuiz/${id}`,
    }),
    createQuiz: builder.mutation<void, QuizCreate>({
      query: (quiz) => ({
        url: `/AddQuiz`,
        method: "POST",
        body: quiz,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    updateQuiz: builder.mutation<void, Quiz>({
      query: (quiz) => ({
        url: `/UpdateQuiz`,
        method: "PATCH",
        body: quiz,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    deleteQuiz: builder.mutation<void, number>({
      query: (id) => ({
        url: `/DeleteQuiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useUpdateQuizMutation,
  useGetQuizQuery,
} = apiSlice;
