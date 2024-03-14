import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Leaderboard = {
  name: string;
  score: number;
  date: Date;
};

type LeaderboardState = {
  leaderboard: Leaderboard[];
  setLeaderboard: (leaderboard: Leaderboard[]) => void;
};

const useLeaderboardStore = create<LeaderboardState>()(
  persist(
    (set) => ({
      leaderboard: [],
      setLeaderboard: (leaderboard) => set({ leaderboard }),
    }),
    {
      name: "yahtzee-leaderboard",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export default useLeaderboardStore;
