import zustand, { create } from "zustand";

export const useQuestionsStore = create((set, get) => ({
  Questions: [],
  setQuestions: (questions: any) =>
    set({
      Questions: [...questions],
    }),
}));
