
import { create } from 'zustand';
import { SavingGoal } from '@/types';
import { useUserStore } from './user';

type SavingGoalState = {
  savingGoals: SavingGoal[];
  setSavingGoals: (goals: SavingGoal[]) => void;
  addSavingGoal: (goal: SavingGoal) => void;
  getUserGoals: () => SavingGoal[];
};

export const useSavingGoalStore = create<SavingGoalState>((set, get) => ({
  savingGoals: [],
  setSavingGoals: (goals) => set({ savingGoals: goals }),
  addSavingGoal: (goal) => {
    set((state) => ({ savingGoals: [goal, ...state.savingGoals] }))
  },
  getUserGoals: () => {
    const { savingGoals } = get();
    const userId = useUserStore.getState().user?.id;
    if (!userId) return [];
    return savingGoals.filter((g) => g.userId === userId);
  }
}));
