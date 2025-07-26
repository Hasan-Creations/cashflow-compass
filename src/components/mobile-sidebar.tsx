"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: Icons.home, label: "Dashboard" },
  { href: "/transactions", icon: Icons.transactions, label: "Transactions" },
  { href: "/recurring", icon: Icons.recurring, label: "Recurring" },
  { href: "/goals", icon: Icons.goals, label: "Goals" },
  { href: "/recommendations", icon: Icons.recommendations, label: "AI Advisor" },
  { href: "/settings", icon: Icons.settings, label: "Settings" },
];

export function MobileSidebar() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="mb-4 flex items-center gap-2 text-lg font-semibold"
                >
                  <Icons.logo className="h-6 w-6 text-primary" />
                  <span className="font-headline">Cashflow Compass</span>
                </Link>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                            pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
    )
}
