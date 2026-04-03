import { create } from "zustand";

const useUserStore = create((set) => ({
  userData: {
    id: "temp",
    username: "Player",
    email: "player@skibag.app",
    avatarUri: null,
    rank: "beginner",
    score: 0,
    day_streak: 0,
    coins: 0,
    referral_code: "",
    avatar_url: null,
  },
  unreadCount: 0,
  setUserData: (data: any) => set({ userData: data }),
}));

export default useUserStore;
