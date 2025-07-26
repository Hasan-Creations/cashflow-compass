
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SavingGoalForm } from "@/components/goals/goal-form";
import { useSavingGoalStore } from "@/store/goals";
import { useUserStore } from "@/store/user";


export default function GoalsPage() {
  const savingGoals = useSavingGoalStore((state) => state.getUserGoals());
  const { currency } = useUserStore();

  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold font-headline">Saving Goals</h1>
                <p className="text-muted-foreground">Set and track your financial goals.</p>
            </div>
            <SavingGoalForm />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savingGoals.length > 0 ? savingGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                <Card key={goal.id}>
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{goal.name}</CardTitle>
                        <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
                    </div>
                    <CardDescription>Deadline: {goal.deadline}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>{currency}{goal.currentAmount.toLocaleString()}</span>
                        <span>{currency}{goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} aria-label={`${goal.name} progress`} />
                    </CardContent>
                </Card>
                );
            }) : (
              <Card className="md:col-span-3 flex items-center justify-center py-12">
                <p className="text-muted-foreground">You haven't set any goals yet. Click "New Goal" to start!</p>
              </Card>
            )}
        </div>
    </div>
  );
}
