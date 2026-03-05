// API client that connects to the Python backend
const API_BASE_URL = "https://the-profile.onrender.com/api";
const profileService = {
  entities: {
    Profile: {
      list: async (sort = '-created_date', limit = 1) => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile`);
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          // Handle both array and single object responses
          if (Array.isArray(data) && data.length > 0) {
            return [data[0]];
          }
          // If it's a single profile object with an id, return it as array
          if (data && data.id) {
            return [data];
          }
          return [];
        } catch (error) {
          console.error('Error fetching profile:', error);
          return [];
        }
      },
      
      update: async (id, profileData) => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });
          if (!response.ok) {
            throw new Error('Failed to update profile');
          }
          return await response.json();
        } catch (error) {
          console.error('Error updating profile:', error);
          throw error;
        }
      },
      
      create: async (profileData) => {
        try {
          const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
          });
          if (!response.ok) {
            throw new Error('Failed to create profile');
          }
          return await response.json();
        } catch (error) {
          console.error('Error creating profile:', error);
          throw error;
        }
      },
    },
  },
  
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        // For file uploads, we'll return a placeholder URL
        // In production, this would integrate with a file storage service
        console.log('File upload called for:', file.name);
        return {
          file_url: `https://example.com/uploads/${file.name}`
        };
      },
    },
  },
};

export const base44 = profileService;
