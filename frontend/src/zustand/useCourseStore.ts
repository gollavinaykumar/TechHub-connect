import zustand, { create } from "zustand";

export const useCourseStore = create((set, get) => ({
  courses: [],
  setCourses: (Allcourses: []) =>
    set({
      courses: [...Allcourses],
    }),
}));
