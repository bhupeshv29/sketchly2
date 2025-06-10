import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background animate-gradient" />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent/10 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container relative flex flex-col items-center text-center gap-8">
        <div className="space-y-4">
          <h1 className="heading-xl">
            Where Ideas Take
            <span className="text-gradient ml-4">
              Shape
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto">
            Transform your creative vision into reality with our intuitive digital canvas.
            Sketch, collaborate, and bring ideas to life in real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/signup" className="hover-scale">
            <Button size="lg" className="bg-primary gap-2 group">
              Start Creating 
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Preview Canvas */}
        <div className="relative w-full max-w-[1200px] mt-16">
          <div className="aspect-video rounded-xl overflow-hidden border shadow-2xl bg-card glass-effect">
            <video 
              className="w-full h-full rounded-lg shadow-lg" 
              controls 
              autoPlay 
              muted 
              loop
              playsInline
            >
              <source src="/Demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" />
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </section>
  );
}