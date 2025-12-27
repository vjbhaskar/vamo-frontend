export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  environment: import.meta.env.VITE_APP_ENV || "development",
} as const;

export const isDevelopment = () => API_CONFIG.environment === "development";
export const isProduction = () => API_CONFIG.environment === "production";
