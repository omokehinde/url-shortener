const { nanoid } = require('nanoid');
const { URL_STORE } = require('../config/constants');

class UrlService {
  constructor() {
    this.urls = URL_STORE;
  }

  encodeUrl(longUrl) {
    const existingEntry = [...this.urls.values()].find(entry => entry.longUrl === longUrl);
    if (existingEntry) return existingEntry;

    const shortCode = nanoid(6);
    const newEntry = {
      longUrl,
      shortCode,
      createdAt: new Date(),
      visits: 0
    };
    
    this.urls.set(shortCode, newEntry);
    return newEntry;
  }

  decodeUrl(shortCode) {
    return this.urls.get(shortCode);
  }

  getStatistics(shortCode) {
    const entry = this.urls.get(shortCode);
    return entry ? {
      shortCode: entry.shortCode,
      visits: entry.visits,
      created_at: entry.createdAt,
      last_accessed: entry.lastAccessed || 'Never'
    } : null;
  }

  listUrls(searchTerm = '') {
    return [...this.urls.values()].filter(entry =>
      entry.longUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );
  }
}

module.exports = new UrlService();