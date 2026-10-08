import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 glass-strong border-t border-blue-500/20 py-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 flex items-center justify-center gap-2 flex-wrap">
          <span>© 2026 Prashant Jangid</span>
          <span className="hidden sm:inline">|</span>
          <span>Professional Video Editor</span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for visual storytelling
          </span>
        </p>
      </div>
    </footer>
  );
}
