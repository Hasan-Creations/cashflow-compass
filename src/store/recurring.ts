
import { create } from 'zustand';
import { RecurringExpense } from '@/types';
import { useUserStore } from './user';

type RecurringExpenseState = {
  recurringExpenses: RecurringExpense[];
  setRecurringExpenses: (expenses: RecurringExpense[]) => void;
  addRecurringExpense: (expense: Omit<RecurringExpense, 'userId'>) => void;
  getUserRecurringExpenses: () => RecurringExpense[];
};

export const useRecurringExpenseStore = create<RecurringExpenseState>((set, get) => ({
  recurringExpenses: [],
  setRecurringExpenses: (expenses) => set({ recurringExpenses: expenses }),
  addRecurringExpense: (expense) => {
    const userId = useUserStore.getState().user?.id;
    if (!userId) return;
    const newExpense = { ...expense, userId };
    set((state) => ({ recurringExpenses: [newExpense, ...state.recurringExpenses] }));
  },
  getUserRecurringExpenses: () => {
    const { recurringExpenses } = get();
    const userId = useUserStore.getState().user?.id;
    if (!userId) return [];
    return recurringExpenses.filter((e) => e.userId === userId);
  }
}));
