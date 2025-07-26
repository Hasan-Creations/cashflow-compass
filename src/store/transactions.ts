
import { create } from 'zustand';
import { Transaction } from '@/types';

type TransactionState = {
  transactions: Transaction[];
  balance: number;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  calculateBalance: () => void;
  getFilteredTransactions: (type: 'all' | 'income' | 'expense') => Transaction[];
};

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  balance: 0,
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),
  calculateBalance: () => {
    const { transactions } = get();
    const newBalance = transactions.reduce((acc, t) => {
      if (t.type === 'income') {
        return acc + t.amount;
      }
      return acc - t.amount;
    }, 0);
    set({ balance: newBalance });
  },
  getFilteredTransactions: (type) => {
    const { transactions } = get();
    if (type === 'all') return transactions;
    return transactions.filter((t) => t.type === type);
  }
}));
