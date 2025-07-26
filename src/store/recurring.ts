
import { create } from 'zustand';
import { RecurringExpense } from '@/types';
import { useUserStore } from './user';

type RecurringExpenseState = {
  recurringExpenses: RecurringExpense[];
  setRecurringExpenses: (expenses: RecurringExpense[]) => void;
  addRecurringExpense: (expense: RecurringExpense) => void;
  getUserRecurringExpenses: () => RecurringExpense[];
};

export const useRecurringExpenseStore = create<RecurringExpenseState>((set, get) => ({
  recurringExpenses: [],
  setRecurringExpenses: (expenses) => set({ recurringExpenses: expenses }),
  addRecurringExpense: (expense) => {
    set((state) => ({ recurringExpenses: [expense, ...state.recurringExpenses] }));
  },
  getUserRecurringExpenses: () => {
    const { recurringExpenses } = get();
    const userId = useUserStore.getState().user?.id;
    if (!userId) return [];
    return recurringExpenses.filter((e) => e.userId === userId);
  }
}));
