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
    return Math.min((totalCurrent / totalTarget) * 100, 100); // Cap at 100%
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
    <div className="space-y-6 py-4 md:p-6">
      {/* Stats Cards Section */}
      <div className="w-full">
        <StatsCards />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Spending Chart - Takes 2/3 width on large screens */}
        <div className="lg:col-span-2 min-h-0">
          <SpendingChart />
        </div>

        {/* Saving Goals Card - Takes 1/3 width on large screens */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle>Saving Goals</CardTitle>
              <CardDescription>
                {getGoalStatusMessage()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savingGoals.length > 0 ? (
                <>
                  {/* Overall Progress Summary if multiple goals */}
                  {savingGoals.length > 1 && (
                    <div className="border-b pb-4 mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <span className="text-muted-foreground">
                          {totalProgress.toFixed(0)}%
                        </span>
                      </div>
                      <Progress 
                        value={totalProgress} 
                        aria-label="Overall saving goals progress" 
                        className="h-2"
                      />
                    </div>
                  )}

                  {/* Individual Goals */}
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {savingGoals.map((goal) => {
                      const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
                      return (
                        <div key={goal.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate pr-2">
                              {goal.name}
                            </span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {currency}{goal.currentAmount.toLocaleString()} / {currency}{goal.targetAmount.toLocaleString()}
                            </span>
                          </div>
                          <Progress 
                            value={progress} 
                            aria-label={`${goal.name} progress: ${progress.toFixed(0)}%`}
                            className="h-2"
                          />
                          <div className="text-xs text-muted-foreground text-right">
                            {progress.toFixed(0)}% complete
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    No saving goals yet.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add one from the Goals page to track your progress!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="w-full">
        <RecentTransactions />
      </div>
    </div>
  );
}