
"use client";

import { MainSidebar } from "@/components/main-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { UserNav } from "@/components/user-nav";
import { CurrentBalance } from "@/components/current-balance";
import { useTransactionStore } from "@/store/transactions";
import { useSavingGoalStore } from "@/store/goals";
import { useRecurringExpenseStore } from "@/store/recurring";
import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { Transaction, SavingGoal, RecurringExpense } from "@/types";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const router = useRouter();
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setSavingGoals = useSavingGoalStore((state) => state.setSavingGoals);
  const setRecurringExpenses = useRecurringExpenseStore((state) => state.setRecurringExpenses);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          const [transactionsRes, goalsRes, recurringRes] = await Promise.all([
            fetch('/api/transactions'),
            fetch('/api/goals'),
            fetch('/api/recurring'),
          ]);

          if (!transactionsRes.ok || !goalsRes.ok || !recurringRes.ok) {
            throw new Error('Failed to fetch data');
          }
          
          const transactions: Transaction[] = await transactionsRes.json();
          const goals: SavingGoal[] = await goalsRes.json();
          const recurring: RecurringExpense[] = await recurringRes.json();

          setTransactions(transactions);
          setSavingGoals(goals);
          setRecurringExpenses(recurring);
        } catch (error) {
            console.error("Failed to load data from APIs", error);
        }
      };
      
      fetchData();
    }
  }, [user, router, setTransactions, setSavingGoals, setRecurringExpenses]);

  // Render nothing or a loading spinner if there's no user
  if (!user) {
    return null; 
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileSidebar />
          <div className="flex-1">
            <h1 className="font-headline text-lg font-semibold">Cashflow Compass</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">
          <CurrentBalance />
          {children}
        </main>
      </div>
    </div>
  );
}
