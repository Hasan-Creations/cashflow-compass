
import { create } from 'zustand';
import { Transaction } from '@/types';
import { useUserStore } from './user';

type TransactionState = {
  transactions: Transaction[];
  balance: number;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (updatedTransaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  calculateBalance: () => void;
  getFilteredTransactions: (type: 'all' | 'income' | 'expense') => Transaction[];
  getUserTransactions: () => Transaction[];
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  balance: 0,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) => {
    set((state) => ({ transactions: [transaction, ...state.transactions] }));
  },
  updateTransaction: (updatedTransaction) => {
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
    }));
  },
  deleteTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },
  calculateBalance: () => {
    const userTransactions = get().getUserTransactions();
    const newBalance = userTransactions.reduce((acc, t) => {
      if (t.type === 'income') {
        return acc + t.amount;
      }
      return acc - t.amount;
    }, 0);
    set({ balance: newBalance });
  },
  getUserTransactions: () => {
    const { transactions } = get();
    const userId = useUserStore.getState().user?.id;
    if (!userId) return [];
    return transactions.filter((t) => t.userId === userId);
  },
  getFilteredTransactions: (type) => {
    const userTransactions = get().getUserTransactions();
    if (type === 'all') return userTransactions;
    return userTransactions.filter((t) => t.type === type);
  }
}));
