
import { create } from 'zustand';
import { RecurringExpense } from '@/types';

type RecurringExpenseState = {
  recurringExpenses: RecurringExpense[];
  setRecurringExpenses: (expenses: RecurringExpense[]) => void;
  addRecurringExpense: (expense: RecurringExpense) => void;
};

export const useRecurringExpenseStore = create<RecurringExpenseState>((set) => ({
  recurringExpenses: [],
  setRecurringExpenses: (expenses) => set({ recurringExpenses: expenses }),
  addRecurringExpense: (expense) =>
    set((state) => ({ recurringExpenses: [expense, ...state.recurringExpenses] })),
}));
