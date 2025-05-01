const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const { redirect } = require('./controllers/urlController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.get('/:url_path', redirect);

// Error handling
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});
  
module.exports = app;