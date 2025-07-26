import { type Transaction, type Category, type SavingGoal, type RecurringExpense } from "@/types";
import transactions from './transactions.json';
import goals from './goals.json';
import recurring from './recurring.json';

export const mockTransactions: Transaction[] = transactions;

export const mockCategories: Category[] = [
    { id: '1', name: 'Food', icon: 'pizza' },
    { id: '2', name: 'Transport', icon: 'bus' },
    { id: '3', name: 'Entertainment', icon: 'film' },
    { id: '4', name: 'Groceries', icon: 'shopping-cart' },
    { id: '5', name: 'Utilities', icon: 'bolt' },
    { id: '6', name: 'Shopping', icon: 'shirt' },
    { id: '7', name: 'Health', icon: 'heart-pulse' },
    { id: '8', name: 'Other', icon: 'ellipsis' },
    { id: '9', name: 'Salary', icon: 'briefcase' },
    { id: '10', name: 'Freelance', icon: 'pencil' },
    { id: '11', name: 'Housing', icon: 'home' },
]

export const mockSavingGoals: SavingGoal[] = goals;

export const mockRecurringExpenses: RecurringExpense[] = recurring;
