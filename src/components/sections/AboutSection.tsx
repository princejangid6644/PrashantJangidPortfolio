import { useEffect, useRef, useState } from 'react';
import { Film, Palette, Sparkles, Award, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import SectionBadge from '@/components/ui/section-badge';

const services = [
  {
    icon: Film,
    title: 'Cinematic Editing',
    description: 'Transform your footage into captivating stories with professional pacing, transitions, and emotional impact',
  },
  {
    icon: Sparkles,
    title: 'Motion Graphics',
    description: 'Eye-catching animated elements, titles, and visual effects that elevate your brand and message',
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Professional color correction and grading that sets the perfect mood and cinematic atmosphere',
  },
];

const stats = [
  { icon: Award, value: 50, suffix: '+', label: 'Projects Completed' },
  { icon: TrendingUp, value: 3, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 30, suffix: '+', label: 'Happy Clients' },
  { icon: CheckCircle2, value: 100, suffix: '%', label: 'Satisfaction Rate' },
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = stats.map((stat, index) => {
      const increment = stat.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(Math.round(increment * currentStep), stat.value);
            return newCounts;
          });
        }
      }, stepDuration);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [isVisible]);

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 scroll-animate">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <SectionBadge>About Us</SectionBadge>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">Crafting Visual Stories</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transforming raw footage into extraordinary cinematic experiences
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&q=80"
              alt="Video editing workspace"
              className="relative rounded-2xl w-full h-[400px] object-cover glass border border-blue-500/30 shadow-2xl"
              loading="lazy"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 flex flex-col justify-center">
            <p className="text-gray-300 text-lg leading-relaxed">
              I am <span className="text-blue-400 font-semibold">Prashant Jangid</span>, a passionate 17-year-old video editor with a vision to transform ordinary footage into extraordinary visual experiences.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I specialize in creating engaging, high-quality videos that tell stories, build brands, and capture attention. From music videos to short films, I bring creativity and technical expertise to every project.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12 gradient-text">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:glow-blue transition-all">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="glass p-12 rounded-3xl border border-blue-500/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <stat.icon className="w-10 h-10 text-blue-400 mx-auto" />
                <div className="text-4xl sm:text-5xl font-bold gradient-text">
                  {counts[index]}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
