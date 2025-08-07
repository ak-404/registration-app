// API configuration using environment variables
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  AUTH_URL: import.meta.env.VITE_API_AUTH_URL,
  APPLICANTS_URL: import.meta.env.VITE_API_APPLICANTS_URL,
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_CONFIG.AUTH_URL}/login`,
  REGISTER: `${API_CONFIG.APPLICANTS_URL}`,
  GET_APPLICANTS: `${API_CONFIG.APPLICANTS_URL}`,
};

export default API_CONFIG; 