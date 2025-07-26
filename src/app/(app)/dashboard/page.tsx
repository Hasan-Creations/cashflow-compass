
"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSavingGoalStore } from "@/store/goals";
import { useUserStore } from "@/store/user";
import { useMemo } from "react";

export default function DashboardPage() {
  const savingGoals = useSavingGoalStore((state) => state.getUserGoals());
  const { currency } = useUserStore();

  const totalProgress = useMemo(() => {
    if (savingGoals.length === 0) return 0;
    const totalCurrent = savingGoals.reduce((acc, goal) => acc + goal.currentAmount, 0);
    const totalTarget = savingGoals.reduce((acc, goal) => acc + goal.targetAmount, 0);
    if (totalTarget === 0) return 0;
    return (totalCurrent / totalTarget) * 100;
  }, [savingGoals]);

  const getGoalStatusMessage = () => {
    if (savingGoals.length === 0) {
      return "Get started by creating a new saving goal!";
    }
    if (totalProgress >= 100) {
      return "Congratulations! You've reached your saving goals.";
    }
    if (totalProgress > 75) {
      return "You're so close! Keep up the great work.";
    }
    return "You are on track to achieve your saving goals.";
  };
  
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Saving Goals</CardTitle>
            <CardDescription>
              {getGoalStatusMessage()}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            {savingGoals.length > 0 ? (
              savingGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {currency}{goal.currentAmount.toLocaleString()} / {currency}{goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} aria-label={`${goal.name} progress`} />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">No saving goals yet. Add one from the Goals page!</p>
            )}
          </CardContent>
        </Card>
      </div>
      <RecentTransactions />
    </div>
  );
}
