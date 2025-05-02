// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateShortUrl = ({ onUrlCreated }) => {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortUrl, setShortUrl] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/api/encode', { longUrl });
//       setShortUrl(response.data.shortUrl);
//       onUrlCreated();
//     } catch (error) {
//       console.error('Error creating short URL:', error);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="url" className="block text-sm font-medium text-gray-700">
//             Enter URL to shorten
//           </label>
//           <input
//             type="url"
//             id="url"
//             required
//             value={longUrl}
//             onChange={(e) => setLongUrl(e.target.value)}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//             placeholder="https://example.com"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Shorten URL
//         </button>
//       </form>
      
//       {shortUrl && (
//         <div className="mt-4 p-4 bg-gray-50 rounded-md">
//           <p className="text-sm font-medium text-gray-700">Short URL:</p>
//           <a
//             href={shortUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-indigo-600 hover:text-indigo-800 break-all"
//           >
//             {shortUrl}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateShortUrl;



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