// import React from 'react';

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Search URLs (minimum 3 characters)"
//         className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//       />
//     </div>
//   );
// };

// export default SearchBar;

import React from 'react';
import { TextField, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <TextField
        fullWidth
        label="Search URLs (minimum 3 characters)"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
        }}
      />
    </Box>
  );
};

export default SearchBar;