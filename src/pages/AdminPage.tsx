
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Plus, Trash2, ArrowLeft, Youtube, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getAdminVideos,
  addAdminVideo,
  deleteAdminVideo,
  updateAdminVideoCategory,
  getPermanentVideoCategory,
  setPermanentVideoCategory,
  AdminVideo,
} from '@/lib/adminStorage';
import { fetchYouTubeTitle, isYoutubeShort } from '@/lib/videoPlayer';

const ADMIN_PASSWORD = 'radheyshyam';

const PERMANENT_VIDEOS = [
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

const PERMANENT_SHORTS = [
  { id: 's1', title: 'Quick Edit 1', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/V6Ea5bk4nSU', isPermanent: true },
  { id: 's3', title: 'Quick Edit 3', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/9JYltLUcY5s', isPermanent: true },
  { id: 's4', title: 'Quick Edit 4', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/g0_JhkLl6dU', isPermanent: true },
  { id: 's5', title: 'Quick Edit 5', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/xmc0BceZ-qA', isPermanent: true },
  { id: 's6', title: 'Quick Edit 6', category: 'Shorts', youtubeUrl: 'https://youtube.com/shorts/Bs6Ec1vES9s', isPermanent: true },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminVideos, setAdminVideos] = useState<AdminVideo[]>([]);
  const [permanentVideos, setPermanentVideos] = useState([...PERMANENT_VIDEOS, ...PERMANENT_SHORTS]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingTitles, setIsFetchingTitles] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Always ask for password - never auto-authenticate
  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminVideos(getAdminVideos());
      
      // Load permanent videos with category overrides
      const updatedPermanent = [...PERMANENT_VIDEOS, ...PERMANENT_SHORTS].map(v => ({
        ...v,
        category: getPermanentVideoCategory(v.id) || v.category
      }));
      setPermanentVideos(updatedPermanent);
      
      // Fetch actual YouTube titles for permanent videos
      setIsFetchingTitles(true);
      const videosWithTitles = await Promise.all(
        updatedPermanent.map(async (v) => {
          try {
            const actualTitle = await fetchYouTubeTitle(v.youtubeUrl);
            return { ...v, title: actualTitle };
          } catch (error) {
            return v; // Keep original title if fetch fails
          }
        })
      );
      setPermanentVideos(videosWithTitles);
      setIsFetchingTitles(false);
      
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin panel',
      });
    } else {
      toast({
        title: 'Incorrect Password',
        description: 'Please try again',
        variant: 'destructive',
      });
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newVideoUrl) {
      toast({
        title: 'Missing URL',
        description: 'Please enter a YouTube URL',
        variant: 'destructive',
      });
      return;
    }

    if (!newVideoUrl.includes('youtube.com') && !newVideoUrl.includes('youtu.be')) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid YouTube URL',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Auto-fetch title from YouTube
      const title = await fetchYouTubeTitle(newVideoUrl);
      
      // Auto-detect if it's a short or regular video
      const category = isYoutubeShort(newVideoUrl) ? 'Shorts' : 'Featured';

      const videoData: AdminVideo = {
        id: `admin-${Date.now()}`,
        title,
        category,
        youtubeUrl: newVideoUrl,
      };

      addAdminVideo(videoData);
      setAdminVideos(getAdminVideos());
      setNewVideoUrl('');
      
      toast({
        title: 'Video Added',
        description: `Added to ${category} section`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add video. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    deleteAdminVideo(id);
    setAdminVideos(getAdminVideos());
    toast({
      title: 'Video Deleted',
      description: 'The video has been removed from your portfolio',
    });
  };

  const handleUpdateAdminCategory = (id: string, newCategory: string) => {
    updateAdminVideoCategory(id, newCategory);
    setAdminVideos(getAdminVideos());
    toast({
      title: 'Category Updated',
      description: `Video moved to ${newCategory}`,
    });
  };

  const handleUpdatePermanentCategory = (id: string, newCategory: string) => {
    setPermanentVideoCategory(id, newCategory);
    setPermanentVideos(prev => prev.map(v => 
      v.id === id ? { ...v, category: newCategory } : v
    ));
    toast({
      title: 'Category Updated',
      description: `Permanent video moved to ${newCategory}`,
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="glass border-blue-500/30 text-white hover:bg-blue-500/20 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="glass p-8 rounded-3xl border border-blue-500/20">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center glow-blue">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-center gradient-text mb-2">Admin Panel</h1>
            <p className="text-center text-gray-400 mb-8">Enter password to continue</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 py-6"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="glass border-blue-500/30 text-white hover:bg-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="glass border-red-500/30 text-red-400 hover:bg-red-500/20"
          >
            Logout
          </Button>
        </div>

        <div className="glass p-8 rounded-3xl border border-blue-500/20 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center glow-blue">
              <Youtube className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Add New Video</h1>
              <p className="text-sm text-gray-400 mt-1">Just paste the YouTube link - title and type will be auto-detected</p>
            </div>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                YouTube URL
              </label>
              <Input
                type="text"
                placeholder="https://youtu.be/... or https://youtube.com/shorts/..."
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                className="glass border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 py-6 text-lg disabled:opacity-50"
            >
              <Plus className="w-5 h-5 mr-2" />
              {isLoading ? 'Adding Video...' : 'Add Video'}
            </Button>
          </form>
        </div>

        {/* Permanent Videos Section */}
        <div className="glass p-8 rounded-3xl border border-blue-500/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Permanent Videos ({permanentVideos.length})</h2>
              <p className="text-sm text-gray-400 mt-1">These videos are built-in and cannot be deleted. You can change their categories.</p>
            </div>
            {isFetchingTitles && (
              <div className="text-sm text-blue-400 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Loading titles...
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {permanentVideos.map((video) => (
              <div
                key={video.id}
                className="glass p-4 rounded-xl border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-semibold flex-1 min-w-0">{video.title}</h3>
                    <span className="text-xs px-2 py-1 bg-green-600/30 text-green-300 rounded-full whitespace-nowrap">Permanent</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{video.youtubeUrl}</p>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select
                    value={video.category}
                    onValueChange={(value) => handleUpdatePermanentCategory(video.id, value)}
                  >
                    <SelectTrigger className="glass border-blue-500/30 text-white w-full sm:w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong border-blue-500/30 max-h-[300px] overflow-y-auto scroll-smooth custom-scrollbar">
                      <SelectItem value="Featured">Featured</SelectItem>
                      <SelectItem value="Short Film">Short Film</SelectItem>
                      <SelectItem value="Music Video">Music Video</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Color Grading">Color Grading</SelectItem>
                      <SelectItem value="Wedding">Wedding</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                      <SelectItem value="Documentary">Documentary</SelectItem>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Advertisement">Advertisement</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Cinematic">Cinematic</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="VFX">VFX</SelectItem>
                      <SelectItem value="Client Work">Client Work</SelectItem>
                      <SelectItem value="Reel">Reel</SelectItem>
                      <SelectItem value="Shorts">Shorts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Added Videos Section */}
        <div className="glass p-8 rounded-3xl border border-blue-500/20">
          <h2 className="text-2xl font-bold text-white mb-6">Your Added Videos ({adminVideos.length})</h2>
          <p className="text-sm text-gray-400 mb-6">Videos you've added can be fully managed - change category or delete.</p>
          
          {adminVideos.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No videos added yet</p>
          ) : (
            <div className="space-y-4">
              {adminVideos.map((video) => (
                <div
                  key={video.id}
                  className="glass p-4 rounded-xl border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <h3 className="text-white font-semibold">{video.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{video.youtubeUrl}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select
                      value={video.category}
                      onValueChange={(value) => handleUpdateAdminCategory(video.id, value)}
                    >
                      <SelectTrigger className="glass border-blue-500/30 text-white w-full sm:w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-strong border-blue-500/30 max-h-[300px] overflow-y-auto scroll-smooth custom-scrollbar">
                        <SelectItem value="Featured">Featured</SelectItem>
                        <SelectItem value="Short Film">Short Film</SelectItem>
                        <SelectItem value="Music Video">Music Video</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Color Grading">Color Grading</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Documentary">Documentary</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Advertisement">Advertisement</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Tutorial">Tutorial</SelectItem>
                        <SelectItem value="Cinematic">Cinematic</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="VFX">VFX</SelectItem>
                        <SelectItem value="Client Work">Client Work</SelectItem>
                        <SelectItem value="Reel">Reel</SelectItem>
                        <SelectItem value="Shorts">Shorts</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      onClick={() => handleDeleteVideo(video.id)}
                      variant="outline"
                      size="sm"
                      className="glass border-red-500/30 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
