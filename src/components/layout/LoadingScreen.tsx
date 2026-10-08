import { useEffect, useState } from 'react';
import { Film, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Sparkling Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

      {/* Center Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo Animation */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center glow-blue animate-scale-in shadow-2xl">
              <Film className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 animate-glow-pulse" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text animate-scale-in">
            Prashant Jangid
          </h1>
          <p className="text-lg text-blue-300 animate-fade-in-up">Professional Video Editor</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto space-y-2">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out rounded-full glow-blue"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">{progress}%</p>
        </div>

        {/* Loading Text */}
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="text-sm">Loading Experience</span>
        </div>
      </div>
    </div>
  );
}
