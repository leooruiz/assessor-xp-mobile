// App Information
export const APP_INFO = {
  name: "Assessor XP",
  version: "1.0.0",
  description: "Seu assistente de investimentos",
  company: "XP Investimentos",
  sprint: "Sprint 4 - Mobile",
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  SESSION: "assessorxp/session",
} as const;

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 2,
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 100,
    ALLOWED_DOMAINS: [
      "gmail.com",
      "hotmail.com",
      "outlook.com",
      "yahoo.com",
      "xp.com.br",
    ],
  },
  PROFILE: {
    REQUIRED_FIELDS: ["suitability", "objetivo", "liquidez"],
  },
} as const;

// Investment Types
export const INVESTMENT_TYPES = {
  SUITABILITY: {
    CONSERVATIVE: "conservador",
    MODERATE: "moderado",
    AGGRESSIVE: "arrojado",
  },
  OBJECTIVE: {
    SHORT_TERM: "curto",
    MEDIUM_TERM: "medio",
    LONG_TERM: "longo",
  },
  LIQUIDITY: {
    LOW: "baixa",
    MEDIUM: "media",
    HIGH: "alta",
  },
} as const;

// Toast/Notification Settings
export const NOTIFICATION_CONFIG = {
  TOAST_DURATION: 3000,
  ERROR_TOAST_DURATION: 5000,
  SUCCESS_TOAST_DURATION: 2000,
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  LOGOUT_DELAY: 800,
  LOADING_SIMULATION: 500,
} as const;
