import zustand, { create } from "zustand";

export const useProfileStore = create((set, get) => ({
  profile: [],
  setProfile: (profiles: any) =>
    set({
      profile: [...profiles],
    }),
}));
