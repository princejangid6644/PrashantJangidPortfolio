import { useEffect, useState } from 'react';
import VideoCard from '@/components/features/VideoCard';
import SectionBadge from '@/components/ui/section-badge';
import { getAdminVideos, getPermanentVideoCategory } from '@/lib/adminStorage';

interface Video {
  id: string;
  title: string;
  category: string;
  youtubeUrl: string;
  isPermanent?: boolean;
}

const PERMANENT_VIDEOS: Video[] = [
  { id: '1', title: 'Featured Cinematic Edit', category: 'Featured', youtubeUrl: 'https://youtu.be/QGFbkoBIavA', isPermanent: true },
  { id: '2', title: 'Short Film Production', category: 'Short Film', youtubeUrl: 'https://youtu.be/LmL9SP3BADc', isPermanent: true },
  { id: '3', title: 'Music Video', category: 'Music Video', youtubeUrl: 'https://youtu.be/7OgkMHu_WYo', isPermanent: true },
  { id: '4', title: 'VFX Showcase', category: 'VFX', youtubeUrl: 'https://youtu.be/gjPJLQR3woE', isPermanent: true },
  { id: '5', title: 'Client Work', category: 'Client Work', youtubeUrl: 'https://youtu.be/0zjWb3H0h5M', isPermanent: true },
  { id: '6', title: 'Creative Reel', category: 'Reel', youtubeUrl: 'https://youtu.be/SVx3AI6jVP4', isPermanent: true },
  { id: '7', title: 'Commercial Project', category: 'Featured', youtubeUrl: 'https://youtu.be/b58Rr2uFd_M', isPermanent: true },
  { id: '8', title: 'Event Coverage', category: 'Client Work', youtubeUrl: 'https://youtu.be/aHmlV6Awcpk', isPermanent: true },
  { id: '9', title: 'Cinematic Storytelling', category: 'Featured', youtubeUrl: 'https://youtu.be/y8UdA24oqws', isPermanent: true },
  { id: '10', title: 'Motion Graphics', category: 'VFX', youtubeUrl: 'https://youtu.be/jiAE-IndHV4', isPermanent: true },
  { id: '11', title: 'Documentary Style', category: 'Client Work', youtubeUrl: 'https://youtu.be/3Xh9Oj9foCU', isPermanent: true },
  { id: '12', title: 'Promotional Video', category: 'Featured', youtubeUrl: 'https://youtu.be/fkAgE48Uq4I', isPermanent: true },
  { id: '13', title: 'Creative Experiment', category: 'Reel', youtubeUrl: 'https://youtu.be/0JHAcGyjjoQ', isPermanent: true },
];

const PERMANENT_SHORTS: Video[] = [
  { id: 's1', title: 'Quick Edit 1', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/V6Ea5bk4nSU', isPermanent: true },
  { id: 's3', title: 'Quick Edit 3', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/9JYltLUcY5s', isPermanent: true },
  { id: 's4', title: 'Quick Edit 4', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/g0_JhkLl6dU', isPermanent: true },
  { id: 's5', title: 'Quick Edit 5', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/xmc0BceZ-qA', isPermanent: true },
  { id: 's6', title: 'Quick Edit 6', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/Bs6Ec1vES9s', isPermanent: true },
];

export default function PortfolioSection() {
  const [adminVideos, setAdminVideos] = useState<Video[]>([]);

  useEffect(() => {
    const loadVideos = () => {
      const videos = getAdminVideos();
      // Only update state if videos actually changed (prevents unnecessary re-renders)
      setAdminVideos(prev => {
        const prevIds = prev.map(v => v.id).sort().join(',');
        const newIds = videos.map(v => v.id).sort().join(',');
        return prevIds === newIds ? prev : videos;
      });
    };
    
    loadVideos();
    
    // Reload videos when window gains focus (prevents auto-delete bug)
    const handleFocus = () => {
      console.log('🔄 Window focused - checking videos...');
      loadVideos();
    };
    window.addEventListener('focus', handleFocus);
    
    // Periodic check every 10 seconds to ensure videos persist (reduced frequency)
    const interval = setInterval(() => {
      console.log('🔄 Periodic check - verifying videos...');
      loadVideos();
    }, 10000);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Apply category overrides to permanent videos
  const permanentWithOverrides = PERMANENT_VIDEOS.map(v => ({
    ...v,
    category: getPermanentVideoCategory(v.id) || v.category
  }));
  
  const shortsWithOverrides = PERMANENT_SHORTS.map(v => ({
    ...v,
    category: getPermanentVideoCategory(v.id) || v.category
  }));
  
  const allVideos = [...permanentWithOverrides, ...adminVideos.filter(v => v.category !== 'Shorts')];
  const allShorts = [...shortsWithOverrides, ...adminVideos.filter(v => v.category === 'Shorts')];

  return (
    <section id="portfolio" className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 scroll-animate">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <SectionBadge>Video Portfolio</SectionBadge>
          <h2 className="text-4xl sm:text-5xl font-bold gradient-text">Featured Work</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of creative visual storytelling and cinematic editing
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {allVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Shorts Section */}
        {allShorts.length > 0 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl sm:text-4xl font-bold gradient-text">Shorts</h3>
              <p className="text-gray-400">Quick creative edits and viral content</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {allShorts.map((short) => (
                <VideoCard key={short.id} video={short} isShort />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
