import { Button } from '@/components/ui/button';
import { ArrowRight, Share2 } from 'lucide-react';
import Link from 'next/link';


export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
    <div className="container relative flex flex-col items-center text-center gap-8">
      <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
        Where Ideas Take
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 ml-4">
          Shape
        </span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-[600px]">
        Transform your creative vision into reality with our intuitive digital canvas.
        Sketch, collaborate, and bring ideas to life in real-time.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
      <Link href={"/signup"}>
        <Button size="lg" className="bg-primary gap-2">
          Start Creating <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      </div>
      {/* Preview Canvas */}
      <div className="relative w-full max-w-[1200px] mt-16">
        <div className="aspect-video rounded-xl overflow-hidden border shadow-2xl bg-card">
        <video className="w-full h-full rounded-lg shadow-lg" controls autoPlay muted loop>
          <source src="/Demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       
        </div>
      </div>
    </div>
  </section>
  );
}