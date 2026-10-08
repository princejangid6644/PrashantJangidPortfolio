import { useState, useEffect, useRef } from 'react';
import { Play, ExternalLink, Maximize, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { videoPlayerManager, getVideoId, getYouTubeThumbnail, fetchYouTubeTitle } from '@/lib/videoPlayer';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    category: string;
    youtubeUrl: string;
  };
  isShort?: boolean;
}

export default function VideoCard({ video, isShort = false }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [actualTitle, setActualTitle] = useState(video.title);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = getVideoId(video.youtubeUrl);
  const thumbnailUrl = getYouTubeThumbnail(videoId || '');
  
  // Fetch actual YouTube title
  useEffect(() => {
    fetchYouTubeTitle(video.youtubeUrl).then(setActualTitle);
  }, [video.youtubeUrl]);

  const handlePlay = () => {
    // Stop any other playing video
    videoPlayerManager.register({
      stop: () => {
        setIsPlaying(false);
      },
    });
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setIsPlaying(false);
    setTimeout(() => handlePlay(), 100);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).mozRequestFullScreen) {
        (iframeRef.current as any).mozRequestFullScreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
  };

  const handleViewOnYouTube = () => {
    window.open(video.youtubeUrl, '_blank');
  };

  if (isShort) {
    return (
      <div className="group relative">
        <div className="glass rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105 h-[450px] sm:h-[500px]">
          {isPlaying ? (
            <div className="relative w-full h-full bg-black">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={actualTitle}
              />
            </div>
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
              <img
                src={thumbnailUrl}
                alt={actualTitle}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <span className="text-xs px-2 py-1 bg-purple-600/80 text-white rounded-full">
                  {video.category}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 space-y-2">
          <h3 className="text-sm font-medium text-white line-clamp-2">{actualTitle}</h3>
          <div className="flex gap-2">
            {isPlaying ? (
              <>
                <Button
                  onClick={handleReplay}
                  variant="outline"
                  size="sm"
                  className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20 text-xs"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Replay
                </Button>
                <Button
                  onClick={handleFullscreen}
                  variant="outline"
                  size="sm"
                  className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20 text-xs"
                >
                  <Maximize className="w-3 h-3 mr-1" />
                  Fullscreen
                </Button>
              </>
            ) : (
              <Button
                onClick={handleViewOnYouTube}
                variant="outline"
                size="sm"
                className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20 text-xs"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                YouTube
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <div className="glass rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105">
        <div className="relative aspect-video">
          {isPlaying ? (
            <div className="relative w-full h-full bg-black">
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={actualTitle}
              />
            </div>
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={handlePlay}>
              <img
                src={thumbnailUrl}
                alt={actualTitle}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center glow-blue group-hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <span className="text-xs px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full">
              {video.category}
            </span>
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {actualTitle}
            </h3>
          </div>
          
          <div className="flex gap-2">
            {isPlaying ? (
              <>
                <Button
                  onClick={handleReplay}
                  variant="outline"
                  className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Replay
                </Button>
                <Button
                  onClick={handleFullscreen}
                  variant="outline"
                  className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20"
                >
                  <Maximize className="w-4 h-4 mr-2" />
                  Fullscreen
                </Button>
              </>
            ) : (
              <Button
                onClick={handleViewOnYouTube}
                variant="outline"
                className="flex-1 glass border-blue-500/30 text-white hover:bg-blue-500/20"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on YouTube
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
