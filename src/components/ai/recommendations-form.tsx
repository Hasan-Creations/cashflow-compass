
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSpendingRecommendations, type SpendingRecommendationsOutput } from "@/ai/flows/spending-recommendations";
import { useTransactionStore } from "@/store/transactions";
import { useSavingGoalStore } from "@/store/goals";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  income: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: "Income must be a positive number." })
  ),
});

interface RecommendationsFormProps {
  onNewRecommendation: (recommendation: SpendingRecommendationsOutput) => void;
}

export function RecommendationsForm({ onNewRecommendation }: RecommendationsFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { transactions } = useTransactionStore();
  const { savingGoals } = useSavingGoalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const spendingData = JSON.stringify(transactions);
      const savingGoalsData = JSON.stringify(savingGoals);

      const result = await getSpendingRecommendations({
        ...values,
        spendingData: spendingData,
        savingGoals: savingGoalsData,
      });
      onNewRecommendation(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Income</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your monthly income" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get Recommendations"
          )}
        </Button>
      </form>
    </Form>
  );
}
