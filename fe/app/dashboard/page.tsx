"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Plus,
  Search,
  Layers,
  Shapes,
  CalendarDays,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { useState, useMemo } from "react";

function DashboardContent() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const rooms = user?.user?.room || [];
  const totalShapes = user?.user?.shapes?.length || 0;

  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return rooms;
    return rooms.filter((r) =>
      r.roomName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [rooms, searchQuery]);

  const memberSince = user?.user?.id
    ? new Date(
        parseInt(user.user.id.split("-")[0], 16) * 1000,
      ).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.user?.username}
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your rooms and start creating.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rooms.length}</p>
              <p className="text-xs text-muted-foreground">Total Rooms</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary/10">
              <Shapes className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalShapes}</p>
              <p className="text-xs text-muted-foreground">Shapes Drawn</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
              <CalendarDays className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-sm">{memberSince}</p>
              <p className="text-xs text-muted-foreground">Member Since</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {rooms.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Rooms</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Link href="/create-room">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                New Room
              </Button>
            </Link>
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
            <Pencil className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No rooms yet</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Create your first room to start drawing and collaborating in
            real-time with others.
          </p>
          <Link href="/create-room">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create your first room
            </Button>
          </Link>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Search className="h-10 w-10 text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground">
            No rooms match &ldquo;{searchQuery}&rdquo;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <Link href={`/room/${room.roomName}`} key={room.id}>
              <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30 h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                      {room.roomName}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    {room.id}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-8">
        <Skeleton className="h-9 w-64 mb-2" />
        <Skeleton className="h-5 w-48" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div>
                <Skeleton className="h-7 w-12 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-3 w-48" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

const DashboardPage = () => {
  const { isLoading } = useAuth();

  return (
    <AuthGuard>
      {isLoading ? <DashboardSkeleton /> : <DashboardContent />}
    </AuthGuard>
  );
};

export default DashboardPage;
