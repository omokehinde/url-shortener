// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UrlList = ({ searchQuery }) => {
//   const [urls, setUrls] = useState([]);

//   useEffect(() => {
//     const fetchUrls = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/list');
//         setUrls(response.data);
//       } catch (error) {
//         console.error('Error fetching URLs:', error);
//       }
//     };
//     fetchUrls();
    
//   }, []);

//   console.log('URLs:', urls);
  
  

//   const filteredUrls = urls.filter(url =>
//     url.longUrl.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">All Short URLs</h2>
//       <div className="space-y-4">
//         {filteredUrls.map((url) => (
//           <div
//             key={url.shortCode}
//             className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex-1 min-w-0">
//                 <a
//                   href={url.longUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-sm font-medium text-indigo-600 hover:text-indigo-800 truncate"
//                 >
//                   {url.longUrl}
//                 </a>
//                 <p className="mt-1 text-sm text-gray-500">
//                   Short URL: <a
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     href={url.shortUrl}
//                     className="text-indigo-500 hover:text-indigo-700"
//                   >
//                     http://short.est/{url.shortCode}
//                   </a>
//                 </p>
//               </div>
//               <div className="ml-4 flex-shrink-0">
//                 <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
//                   {url.visits} visits
//                 </span>
//               </div>
//             </div>
//             <p className="mt-2 text-xs text-gray-400">
//               Created: {new Date(url.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UrlList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Link, 
  Chip,
  CircularProgress 
} from '@mui/material';
import { format } from 'date-fns';

const UrlList = ({ searchQuery }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/list');
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  const filteredUrls = urls.filter(url =>
    url.longUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        All Short URLs
      </Typography>
      
      {filteredUrls.map((url) => (
        <Card key={url.shortCode} sx={{ mb: 2, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 3 } }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Link
                  href={url.longUrl}
                  target="_blank"
                  rel="noopener"
                  sx={{ 
                    fontWeight: 'medium', 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {url.longUrl}
                </Link>
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Short URL:
                  </Typography>
                  <Link
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener"
                    sx={{ wordBreak: 'break-all' }}
                  >
                    http://short.est/{url.shortCode}
                  </Link>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Created: {format(new Date(url.createdAt), 'MMM dd, yyyy HH:mm')}
                </Typography>
              </Box>
              
              <Chip 
                label={`${url.visits} visits`}
                variant="outlined"
                color="primary"
                sx={{ ml: 2 }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UrlList;