import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img src="/favicon.ico" alt="Cashflow Compass Logo" className="h-10 w-10" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto flex flex-col items-center justify-center space-y-6 px-4 py-12 text-center md:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Navigate Your Finances with Confidence
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Cashflow Compass is the all-in-one app to track your spending, manage your budget,
              and achieve your financial goals. Simple, intuitive, and powerful.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Get Started for Free
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="bg-muted/40">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="Dashboard preview"
              width={1200}
              height={600}
              className="mx-auto rounded-xl shadow-2xl"
              data-ai-hint="finance dashboard"
            />
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center">
              <Icons.barChart className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-bold">Smart Tracking</h3>
              <p className="mt-2 text-muted-foreground">Log expenses and income effortlessly. See where your money goes with beautiful charts.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Icons.goals className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-bold">Achieve Goals</h3>
              <p className="mt-2 text-muted-foreground">Set savings goals and track your progress. We'll cheer you on every step of the way.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Icons.recommendations className="h-12 w-12 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-bold">AI-Powered Insights</h3>
              <p className="mt-2 text-muted-foreground">Get personalized recommendations to cut costs and grow your savings faster.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto flex items-center justify-between px-4 py-6 text-sm text-muted-foreground md:px-6">
          <p>&copy; 2024 Cashflow Compass. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
