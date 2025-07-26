import { StatsCards } from "@/components/dashboard/stats-cards";
import { SpendingChart } from "@/components/dashboard/spending-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockSavingGoals } from "@/data/mock-data";

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <StatsCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SpendingChart />
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Saving Goals</CardTitle>
              <CardDescription>
                You are on track to achieve your saving goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {mockSavingGoals.map((goal) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} aria-label={`${goal.name} progress`} />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
}
