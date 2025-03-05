// Application constants
export const TEAM_BUDGET = 100; // $100M budget
export const MAX_DRIVERS = 5; // Max 5 drivers per team
export const POINTS_SYSTEM = {
  POLE_POSITION: 10,
  RACE_WIN: 25,
  RACE_SECOND: 18,
  RACE_THIRD: 15,
  FASTEST_LAP: 5,
  FINISHING_POINTS: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1], // Points for 1st to 10th
  DNF: -5,
};

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DRIVERS: '/drivers',
  RACES: '/races',
  TEAMS: '/teams',
  USER_TEAM: '/user/team',
  LEADERBOARD: '/leaderboard',
  NEWS: '/news',
};

// Theme colors
export const COLORS = {
  PRIMARY: '#e10600', // F1 red
  SECONDARY: '#15151e', // F1 dark
  ACCENT: '#3671c6', // F1 blue
  BACKGROUND: '#f5f5f5',
  CARD: '#ffffff',
  TEXT: '#333333',
  TEXT_LIGHT: '#777777',
  SUCCESS: '#4CAF50',
  WARNING: '#FFC107',
  ERROR: '#F44336',
};