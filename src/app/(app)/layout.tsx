
"use client";

import { MainSidebar } from "@/components/main-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { UserNav } from "@/components/user-nav";
import { CurrentBalance } from "@/components/current-balance";
import { useTransactionStore } from "@/store/transactions";
import { useSavingGoalStore } from "@/store/goals";
import { useRecurringExpenseStore } from "@/store/recurring";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { Transaction, SavingGoal, RecurringExpense, User } from "@/types";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setSavingGoals = useSavingGoalStore((state) => state.setSavingGoals);
  const setRecurringExpenses = useRecurringExpenseStore((state) => state.setRecurringExpenses);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in.
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const currentUser = { id: firebaseUser.uid, ...userDocSnap.data() } as Omit<User, 'password'>;
          setUser(currentUser);
        }
        
        // Fetch data from Firestore
        const fetchData = async () => {
          try {
            // Transactions
            const transQuery = query(collection(db, "transactions"), where("userId", "==", firebaseUser.uid));
            const transSnapshot = await getDocs(transQuery);
            const transactions = transSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[];
            setTransactions(transactions);

            // Saving Goals
            const goalsQuery = query(collection(db, "saving_goals"), where("userId", "==", firebaseUser.uid));
            const goalsSnapshot = await getDocs(goalsQuery);
            const goals = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SavingGoal[];
            setSavingGoals(goals);

            // Recurring Expenses
            const recurringQuery = query(collection(db, "recurring_expenses"), where("userId", "==", firebaseUser.uid));
            const recurringSnapshot = await getDocs(recurringQuery);
            const recurring = recurringSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RecurringExpense[];
            setRecurringExpenses(recurring);

          } catch (error) {
            console.error("Failed to load data from Firestore", error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      } else {
        // User is signed out.
        setUser(null);
        setTransactions([]);
        setSavingGoals([]);
        setRecurringExpenses([]);
        router.push('/login');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router, setUser, setTransactions, setSavingGoals, setRecurringExpenses]);

  if (loading || !user) {
    return null; // or a loading spinner
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
