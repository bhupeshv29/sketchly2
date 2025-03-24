import { Brush, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 bg-muted/10 border-t border-primary/10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Brush className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Sketchly</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/bhupeshv29/CollabDraw.git" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/bhupesh_29" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © 2025 Sketchly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}