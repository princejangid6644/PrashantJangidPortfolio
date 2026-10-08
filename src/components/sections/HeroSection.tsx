import { ChevronDown, Play, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 scroll-animate">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-blue-500/30 animate-scale-in">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Professional Video Editor</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white">
            Hi, I'm <br />
            <span className="gradient-text text-glow">Prashant Jangid</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-300">
            A Creative Video Editor
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          "I turn raw clips into powerful visual stories"
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={scrollToPortfolio}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 py-6 text-lg glow-blue transition-all hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            View My Work
          </Button>
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="glass border-blue-500/50 text-white hover:bg-blue-500/20 px-8 py-6 text-lg transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 animate-bounce">
          <p className="text-sm text-gray-500 mb-2">Scroll to explore</p>
          <ChevronDown className="w-6 h-6 text-blue-400 mx-auto" />
        </div>
      </div>
    </section>
  );
}
