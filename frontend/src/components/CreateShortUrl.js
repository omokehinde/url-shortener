import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Paper, 
  Alert 
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';

const CreateShortUrl = ({ onUrlCreated }) => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/encode', { longUrl });
      setShortUrl(response.data.shortUrl);
      onUrlCreated();
      setError('');
    } catch (err) {
      setError('Failed to create short URL. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Short URL
        </Typography>
        
        <form onSubmit={handleSubmit}>
        <TextField
            fullWidth
            label="Enter URL to shorten"
            variant="outlined"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            type="url"
            margin="normal"
            slotProps={{  
              input: {
                startAdornment: <LinkIcon sx={{ mr: 1, color: 'action.active' }} />
              }
            }}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
          >
            Shorten URL
          </Button>
        </form>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        
        {shortUrl && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Typography variant="subtitle1">Short URL:</Typography>
            <Link 
              href={shortUrl} 
              target="_blank" 
              rel="noopener"
              sx={{ wordBreak: 'break-all' }}
            >
              {shortUrl}
            </Link>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CreateShortUrl;