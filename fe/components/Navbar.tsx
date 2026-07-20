"use client";

import { Button } from "@/components/ui/button";
import { Brush, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("mobile-menu");
      if (menu && !menu.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const initials = user?.user?.username
    ? user.user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Brush className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          <span className="text-base md:text-lg font-bold">Sketchly</span>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-1 md:gap-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm transition-all duration-300 ease-in-out"
                >
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium leading-none">
                        {user?.user?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs md:text-sm lg:text-base transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700 px-2 md:px-4"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="sm"
                  className="bg-primary text-xs md:text-sm lg:text-base transition-all duration-300 ease-in-out hover:bg-primary/80 px-2 md:px-4"
                >
                  Start Drawing
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Menu className="h-6 w-6 text-primary" />
        </button>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute right-4 top-16 bg-background border rounded-lg shadow-lg flex flex-col gap-2 p-4 z-50 min-w-[160px] animate-fade-in"
          >
            {isAuthenticated ? (
              <>
                <div className="px-2 py-1">
                  <p className="text-sm font-medium">{user?.user?.username}</p>
                  <p className="text-xs text-muted-foreground">{user?.user?.email}</p>
                </div>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm text-destructive"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-primary text-sm transition-all duration-300 hover:bg-primary/80"
                  >
                    Start Drawing
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
