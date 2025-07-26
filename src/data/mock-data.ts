import { type Transaction, type Category, type SavingGoal, type RecurringExpense } from "@/types";

export const mockTransactions: Transaction[] = [
  { id: '1', type: 'expense', category: 'Food', amount: 25.50, date: '2024-07-29', description: 'Lunch with colleagues' },
  { id: '2', type: 'income', category: 'Salary', amount: 3000, date: '2024-07-28', description: 'Monthly Salary' },
  { id: '3', type: 'expense', category: 'Transport', amount: 50.00, date: '2024-07-28', description: 'Monthly bus pass' },
  { id: '4', type: 'expense', category: 'Entertainment', amount: 75.00, date: '2024-07-27', description: 'Movie tickets' },
  { id: '5', type: 'expense', category: 'Groceries', amount: 120.34, date: '2024-07-26', description: 'Weekly grocery shopping' },
  { id: '6', type: 'income', category: 'Freelance', amount: 500, date: '2024-07-25', description: 'Web design project' },
  { id: '7', type: 'expense', category: 'Utilities', amount: 150.00, date: '2024-07-25', description: 'Electricity Bill' },
  { id: '8', type: 'expense', category: 'Shopping', amount: 250.00, date: '2024-07-24', description: 'New shoes' },
];


export const mockCategories: Category[] = [
    { id: '1', name: 'Food', icon: 'pizza' },
    { id: '2', name: 'Transport', icon: 'bus' },
    { id: '3', name: 'Entertainment', icon: 'film' },
    { id: '4', name: 'Groceries', icon: 'shopping-cart' },
    { id: '5', name: 'Utilities', icon: 'bolt' },
    { id: '6', name: 'Shopping', icon: 'shirt' },
    { id: '7', name: 'Health', icon: 'heart-pulse' },
    { id: '8', name: 'Other', icon: 'ellipsis' },
]

export const mockSavingGoals: SavingGoal[] = [
    { id: '1', name: 'New Laptop', targetAmount: 2000, currentAmount: 1200, deadline: '2024-12-31' },
    { id: '2', name: 'Vacation to Japan', targetAmount: 5000, currentAmount: 1500, deadline: '2025-06-30' },
    { id: '3', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 8500, deadline: '2024-10-01' },
];


export const mockRecurringExpenses: RecurringExpense[] = [
    { id: '1', name: 'Netflix Subscription', category: 'Entertainment', amount: 15.49, frequency: 'monthly', nextPaymentDate: '2024-08-15' },
    { id: '2', name: 'Gym Membership', category: 'Health', amount: 40.00, frequency: 'monthly', nextPaymentDate: '2024-08-01' },
    { id: '3', name: 'Rent', category: 'Housing', amount: 1200.00, frequency: 'monthly', nextPaymentDate: '2024-08-01' },
    { id: '4', name: 'Phone Bill', category: 'Utilities', amount: 60.00, frequency: 'monthly', nextPaymentDate: '2024-08-20' },
];
