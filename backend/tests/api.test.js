const request = require('supertest');
const app = require('../src/app');
const urlService = require('../src/services/urlService');
const { URL_STORE } = require('../src/config/constants');

describe('URL Shortener API', () => {
  beforeEach(() => URL_STORE.clear());

  describe('Encoding', () => {
    test('Valid URL returns 201 with short URL', async () => {
      const res = await request(app)
        .post('/api/encode')
        .send({ longUrl: 'https://indicina.co' });
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('shortUrl');
    });
  });

  describe('Decoding', () => {
    test('Valid short code returns original URL', async () => {
      const entry = urlService.encodeUrl('https://indicina.co');
      const res = await request(app)
        .post('/api/decode')
        .send({ shortCode: entry.shortCode });
      
      expect(res.body.longUrl).toBe('https://indicina.co');
    });
  });

  describe('Statistics', () => {
    test('Returns correct visit count', async () => {
      const entry = urlService.encodeUrl('https://indicina.co');
      await request(app).get(`/${entry.shortCode}`);
      
      const res = await request(app)
        .get(`/api/statistic/${entry.shortCode}`);
      
      expect(res.body.visits).toBe(1);
    });
  });

  describe('Listing', () => {
    test('Search filters results correctly', async () => {
      urlService.encodeUrl('https://example.com/search-test');
      
      const res = await request(app)
        .get('/api/list')
        .query({ search: 'test' });
      
      expect(res.body.some(url => url.longUrl.includes('search-test'))).toBe(true);
    });
  });
});