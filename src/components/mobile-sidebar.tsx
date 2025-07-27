
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
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
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            A list of links to navigate to different pages of the application.
          </SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            onClick={closeSheet}
          >
            <img src="/favicon.ico" alt="Cashflow Compass Logo" className="h-8 w-8" />
            <span className="sr-only">Dashboard</span>
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSheet}
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
