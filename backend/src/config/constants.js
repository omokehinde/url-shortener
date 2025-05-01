// This file contains constants used throughout the application.
// It includes the URL store, short code length, base URL, and minimum search characters.
module.exports = {
    URL_STORE: new Map(), // In-memory storage for URLs
    SHORT_CODE_LENGTH: 6, // Length of generated short codes
    BASE_URL: process.env.BASE_URL || 'http://localhost:3001', // Base URL for short links
    MIN_SEARCH_CHARS: 3 // Minimum characters for search functionality
  };