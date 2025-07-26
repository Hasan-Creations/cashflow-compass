
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
import { User } from "@/types";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getUserTransactions } from "@/lib/firebase/transactions";
import { getUserGoals } from "@/lib/firebase/goals";
import { getUserRecurring } from "@/lib/firebase/recurring";

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
            const [transactions, goals, recurring] = await Promise.all([
              getUserTransactions(firebaseUser.uid),
              getUserGoals(firebaseUser.uid),
              getUserRecurring(firebaseUser.uid),
            ]);
            setTransactions(transactions);
            setSavingGoals(goals);
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
