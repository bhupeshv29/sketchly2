import { Button } from '@/components/ui/button';
import { Brush } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Sketchly</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Link href={"/signin"}>
            <Button
              variant="ghost"
              size="sm"
              className="text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Sign In
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button
              size="sm"
              className="bg-primary text-sm md:text-base transition-all duration-300 ease-in-out hover:bg-primary/80"
            >
              Start Drawing
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}