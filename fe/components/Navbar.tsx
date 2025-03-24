import { Button } from '@/components/ui/button';
import { Brush } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Sketchly</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={"/signin"}>
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href={"/signup"}>
            <Button size="sm" className="bg-primary">Start Drawing</Button>
          </Link>
         
        </div>
      </div>
    </nav>
  );
}