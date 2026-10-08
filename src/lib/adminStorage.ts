const ADMIN_AUTH_KEY = 'prashant_admin_auth';
const ADMIN_VIDEOS_KEY = 'prashant_admin_videos';
const PERMANENT_CATEGORIES_KEY = 'prashant_permanent_categories';

export interface AdminVideo {
  id: string;
  title: string;
  category: string;
  youtubeUrl: string;
}

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
};

export const authenticateAdmin = (): void => {
  localStorage.setItem(ADMIN_AUTH_KEY, 'true');
};

export const logoutAdmin = (): void => {
  localStorage.removeItem(ADMIN_AUTH_KEY);
};

export const getAdminVideos = (): AdminVideo[] => {
  try {
    const videos = localStorage.getItem(ADMIN_VIDEOS_KEY);
    if (!videos) return [];
    const parsed = JSON.parse(videos);
    // Strict validation to prevent any auto-deletion
    if (!Array.isArray(parsed)) {
      console.error('Invalid admin videos data format');
      return [];
    }
    // Validate each video object
    return parsed.filter(v => v && v.id && v.youtubeUrl && v.category);
  } catch (error) {
    console.error('Error reading admin videos:', error);
    return [];
  }
};

export const addAdminVideo = (video: AdminVideo): void => {
  try {
    const videos = getAdminVideos();
    // Prevent duplicate IDs
    if (videos.find(v => v.id === video.id)) {
      console.warn('Video with this ID already exists');
      return;
    }
    videos.push(video);
    const jsonString = JSON.stringify(videos);
    localStorage.setItem(ADMIN_VIDEOS_KEY, jsonString);
    // Verify the save was successful
    const saved = localStorage.getItem(ADMIN_VIDEOS_KEY);
    if (saved === jsonString) {
      console.log('✅ Video added and verified:', video.id);
    } else {
      console.error('⚠️ Video save verification failed');
    }
  } catch (error) {
    console.error('Error adding video:', error);
  }
};

export const deleteAdminVideo = (id: string): void => {
  try {
    const videos = getAdminVideos();
    const initialCount = videos.length;
    const filtered = videos.filter((v) => v.id !== id);
    // Only save if actually deleting something
    if (filtered.length < initialCount) {
      const jsonString = JSON.stringify(filtered);
      localStorage.setItem(ADMIN_VIDEOS_KEY, jsonString);
      console.log('✅ Video deleted successfully:', id);
    } else {
      console.warn('⚠️ No video found with ID:', id);
    }
  } catch (error) {
    console.error('Error deleting video:', error);
  }
};

export const updateAdminVideoCategory = (id: string, category: string): void => {
  try {
    const videos = getAdminVideos();
    const updated = videos.map(v => v.id === id ? { ...v, category } : v);
    const jsonString = JSON.stringify(updated);
    localStorage.setItem(ADMIN_VIDEOS_KEY, jsonString);
    console.log('✅ Category updated successfully:', id, category);
  } catch (error) {
    console.error('Error updating category:', error);
  }
};

// Permanent video category overrides
export const getPermanentVideoCategory = (id: string): string | null => {
  try {
    const categories = localStorage.getItem(PERMANENT_CATEGORIES_KEY);
    if (!categories) return null;
    const parsed = JSON.parse(categories);
    return parsed[id] || null;
  } catch (error) {
    console.error('Error reading permanent category:', error);
    return null;
  }
};

export const setPermanentVideoCategory = (id: string, category: string): void => {
  try {
    const categories = localStorage.getItem(PERMANENT_CATEGORIES_KEY);
    const parsed = categories ? JSON.parse(categories) : {};
    parsed[id] = category;
    localStorage.setItem(PERMANENT_CATEGORIES_KEY, JSON.stringify(parsed));
    console.log('Permanent category updated:', id, category);
  } catch (error) {
    console.error('Error setting permanent category:', error);
  }
};
