
import { create } from 'zustand';
import { SavingGoal } from '@/types';

type SavingGoalState = {
  savingGoals: SavingGoal[];
  setSavingGoals: (goals: SavingGoal[]) => void;
  addSavingGoal: (goal: SavingGoal) => void;
};

export const useSavingGoalStore = create<SavingGoalState>((set) => ({
  savingGoals: [],
  setSavingGoals: (goals) => set({ savingGoals: goals }),
  addSavingGoal: (goal) =>
    set((state) => ({ savingGoals: [goal, ...state.savingGoals] })),
}));
