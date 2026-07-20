"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Copy, LogOut, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RoomHeaderProps {
  roomName: string;
}

export function RoomHeader({ roomName }: RoomHeaderProps) {
  const router = useRouter();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleLeave = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-sm font-medium truncate max-w-[200px] md:max-w-none">
          {roomName}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="gap-2 text-xs"
        >
          <Copy className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              Copy invite link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLeave}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Leave room
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
