
import { type Transaction, type Category, type SavingGoal, type RecurringExpense } from "@/types";
import transactions from './transactions.json';
import goals from './goals.json';
import recurring from './recurring.json';

// We are moving away from mock data, but will keep these files for type consistency
// and potentially for seeding in the future.
export const mockSavingGoals: SavingGoal[] = goals;
export const mockRecurringExpenses: RecurringExpense[] = recurring;

export const categories: Category[] = [
    { id: 'salary', name: 'Salary', icon: 'briefcase' },
    { id: 'freelance', name: 'Freelance', icon: 'pencil' },
    { id: 'food', name: 'Food', icon: 'pizza' },
    { id: 'transport', name: 'Transport', icon: 'bus' },
    { id: 'entertainment', name: 'Entertainment', icon: 'film' },
    { id: 'groceries', name: 'Groceries', icon: 'shopping-cart' },
    { id: 'utilities', name: 'Utilities', icon: 'bolt' },
    { id: 'shopping', name: 'Shopping', icon: 'shirt' },
    { id: 'health', name: 'Health', icon: 'heart-pulse' },
    { id: 'housing', name: 'Housing', icon: 'home' },
    { id: 'education', name: 'Education', icon: 'book-marked' },
    { id: 'other', name: 'Other', icon: 'ellipsis' },
];

export const incomeCategories = categories.filter(c => ['salary', 'freelance'].includes(c.id));
export const expenseCategories = categories.filter(c => !['salary', 'freelance'].includes(c.id));

export const currencies = [
  { value: "pkr", label: "PKR (₨)", symbol: "₨" },
  { value: "usd", label: "USD ($)", symbol: "$" },
  { value: "eur", label: "EUR (€)", symbol: "€" },
  { value: "gbp", label: "GBP (£)", symbol: "£" },
  { value: "jpy", label: "JPY (¥)", symbol: "¥" },
];
