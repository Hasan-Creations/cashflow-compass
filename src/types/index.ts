export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string; // Should be a key of Icons
};

export type SavingGoal = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
}

export type RecurringExpense = {
    id: string;
    name: string;
    category: string;
    amount: number;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    nextPaymentDate: string;
}
