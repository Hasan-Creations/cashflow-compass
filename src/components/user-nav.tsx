
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/store/user";

export function UserNav() {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const handleLogout = () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40" alt="@user" data-ai-hint="profile picture" />
            <AvatarFallback>{user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem>
              <Icons.settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/goals">
            <DropdownMenuItem>
              <Icons.goals className="mr-2 h-4 w-4" />
              <span>Saving Goals</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <Icons.logout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-1">
          <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
