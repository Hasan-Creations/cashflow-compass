
import { create } from 'zustand';
import { SavingGoal } from '@/types';
import { useUserStore } from './user';

type SavingGoalState = {
  savingGoals: SavingGoal[];
  setSavingGoals: (goals: SavingGoal[]) => void;
  addSavingGoal: (goal: Omit<SavingGoal, 'userId'>) => void;
  getUserGoals: () => SavingGoal[];
};

export const useSavingGoalStore = create<SavingGoalState>((set, get) => ({
  savingGoals: [],
  setSavingGoals: (goals) => set({ savingGoals: goals }),
  addSavingGoal: (goal) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;
    const newGoal = { ...goal, userId };
    set((state) => ({ savingGoals: [newGoal, ...state.savingGoals] }))
  },
  getUserGoals: () => {
    const { savingGoals } = get();
    const userId = useUserStore.getState().user?.id;
    if (!userId) return [];
    return savingGoals.filter((g) => g.userId === userId);
  }
}));
