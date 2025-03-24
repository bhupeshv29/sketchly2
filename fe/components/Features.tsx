import { Card } from '@/components/ui/card';
import { PenTool, Users, Layers, Zap, Lock, Share2 } from 'lucide-react';

const features = [
  { title: 'Intuitive Tools', description: 'Professional-grade drawing tools.', icon: PenTool },
  { title: 'Real-time Collaboration', description: 'Work with your team.', icon: Users },
  { title: 'Infinite Canvas', description: 'No boundaries to creativity.', icon: Layers },
  { title: 'Lightning Fast', description: 'Smooth, lag-free drawing.', icon: Zap },
  { title: 'Secure Sharing', description: 'Customizable privacy settings.', icon: Lock },
  { title: 'Easy Export', description: 'One-click exports.', icon: Share2 },
];




export function Features() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Unleash Your Creativity
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 bg-card/50 backdrop-blur border-primary/10">
              <feature.icon className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}