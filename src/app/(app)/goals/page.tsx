
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";
import { SavingGoalForm } from "@/components/goals/goal-form";
import { useSavingGoalStore } from "@/store/goals";
import { mockSavingGoals } from "@/data/mock-data";


export default function GoalsPage() {
  const { savingGoals, setSavingGoals } = useSavingGoalStore();

  useEffect(() => {
    setSavingGoals(mockSavingGoals);
  }, [setSavingGoals]);

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
            {savingGoals.map((goal) => {
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
                        <span>₨{goal.currentAmount.toLocaleString()}</span>
                        <span>₨{goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <Progress value={progress} aria-label={`${goal.name} progress`} />
                    </CardContent>
                </Card>
                );
            })}
        </div>
    </div>
  );
}
