import { MainSidebar } from "@/components/main-sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { UserNav } from "@/components/user-nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
          <Card className="sticky top-14 sm:top-4 mb-4 z-20">
             <CardHeader className="p-4">
                 <div className="flex items-center justify-between">
                     <div>
                        <CardDescription>Current Balance</CardDescription>
                        <CardTitle className="text-4xl font-headline">$12,345.67</CardTitle>
                     </div>
                     <div className="flex gap-2">
                         <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> Add Income</Button>
                         <Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/> Log Expense</Button>
                     </div>
                 </div>
             </CardHeader>
          </Card>
          {children}
        </main>
      </div>
    </div>
  );
}
