"use client";

import { useState } from "react";
import { type SpendingRecommendationsOutput } from "@/ai/flows/spending-recommendations";
import { RecommendationsForm } from "@/components/ai/recommendations-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, LineChart, AlertTriangle, PiggyBank } from "lucide-react";

export default function RecommendationsPage() {
  const [recommendation, setRecommendation] = useState<SpendingRecommendationsOutput | null>(null);

  const handleNewRecommendation = (data: SpendingRecommendationsOutput) => {
    setRecommendation(data);
  };

  return (
    <div className="grid gap-8 md:grid-cols-5">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="h-6 w-6" />
              AI Financial Advisor
            </CardTitle>
            <CardDescription>
              Provide your financial data to get personalized recommendations from our AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecommendationsForm onNewRecommendation={handleNewRecommendation} />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-3">
        {recommendation ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Spending Spike Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recommendation.spendingSpikesPrediction}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Budget Cut Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recommendation.budgetCutSuggestions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Unusual Activity Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{recommendation.unusualActivityDetection}</p>
              </CardContent>
            </Card>
             <Card className="bg-primary/10 border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Recommended Monthly Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">
                  ${recommendation.recommendedMonthlyBudget.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="flex h-full min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Recommendations Yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form to generate your personalized financial advice.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
