const urlService = require('../services/urlService');
const { BASE_URL, MIN_SEARCH_CHARS } = require('../config/constants');

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

exports.encode = (req, res) => {
  const { longUrl } = req.body;
  
  if (!longUrl) return res.status(400).json({ error: 'Missing longUrl parameter' });
  if (!validateUrl(longUrl)) return res.status(400).json({ error: 'Invalid URL format' });

  try {
    const result = urlService.encodeUrl(longUrl);
    console.log(result);
    
    res.status(201).json({
      shortUrl: `${BASE_URL}/${result.shortCode}`,
      shortCode: result.shortCode,
      createdAt: result.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create short URL' });
  }
};

exports.decode = (req, res) => {
  const { shortCode } = req.body;
  
  if (!shortCode) return res.status(400).json({ error: 'Missing shortCode parameter' });
  
  const entry = urlService.decodeUrl(shortCode);
  if (!entry) return res.status(404).json({ error: 'Short URL not found' });
  
  res.json({
    longUrl: entry.longUrl,
    visits: entry.visits,
    created: entry.createdAt
  });
};

exports.statistics = (req, res) => {
  const { url_path: shortCode } = req.params;
  const entry = urlService.getStatistics(shortCode);
  
  if (!entry) return res.status(404).json({ error: 'Short URL not found' });
  
  res.json({
    shortCode,
    visits: entry.visits,
    created: entry.createdAt,
    lastAccessed: entry.lastAccessed || 'Never',
    qrCode: `${BASE_URL}/qr/${shortCode}` // Bonus feature
  });
};

exports.list = (req, res) => {
  const searchTerm = req.query.search?.trim() || '';
  
  if (searchTerm && searchTerm.length < MIN_SEARCH_CHARS) {
    return res.status(400).json({ 
      error: `Search requires at least ${MIN_SEARCH_CHARS} characters` 
    });
  }

  try {
    const results = urlService.listUrls(searchTerm);
    res.json(results.map(entry => ({
      longUrl: entry.longUrl,
      shortUrl: `${BASE_URL}/${entry.shortCode}`,
      shortCode: entry.shortCode,
      createdAt: entry.createdAt,
      visits: entry.visits
    })));
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve URLs' });
  }
};

exports.redirect = (req, res) => {
  const { url_path: shortCode } = req.params;
  const entry = urlService.decodeUrl(shortCode);

  if (!entry) return res.status(404).json({ error: 'URL not found' });

  entry.visits++;
  entry.lastAccessed = new Date();
  
  res.redirect(302, entry.longUrl);
};