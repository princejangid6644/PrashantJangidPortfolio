// Global video player manager to ensure only one video plays at a time
class VideoPlayerManager {
  private currentPlayer: { stop: () => void } | null = null;

  register(player: { stop: () => void }) {
    if (this.currentPlayer && this.currentPlayer !== player) {
      this.currentPlayer.stop();
    }
    this.currentPlayer = player;
  }

  stopAll() {
    if (this.currentPlayer) {
      this.currentPlayer.stop();
      this.currentPlayer = null;
    }
  }
}

export const videoPlayerManager = new VideoPlayerManager();

// Extract video ID from various YouTube URL formats
export function getVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Check if URL is a YouTube Short
export function isYoutubeShort(url: string): boolean {
  return url.includes('/shorts/');
}

// Fetch YouTube video title using oEmbed API
export async function fetchYouTubeTitle(url: string): Promise<string> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    );
    if (response.ok) {
      const data = await response.json();
      return data.title || 'Untitled Video';
    }
  } catch (error) {
    console.error('Error fetching YouTube title:', error);
  }
  return 'Untitled Video';
}

// Get YouTube thumbnail URL with cache-busting to always get latest thumbnail
export function getYouTubeThumbnail(videoId: string): string {
  // Add timestamp to force refresh and get latest thumbnail from YouTube
  // Refresh every 30 minutes to ensure thumbnails stay updated
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 30));
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg?t=${timestamp}`;
}
