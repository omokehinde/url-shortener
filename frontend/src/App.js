// import React, { useState } from 'react';
// import CreateShortUrl from './components/CreateShortUrl';
// import UrlList from './components/UrlList';
// import SearchBar from './components/SearchBar';

// function App() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [refreshList, setRefreshList] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto py-4 px-4">
//           <h1 className="text-3xl font-bold text-gray-900">URL Shortener</h1>
//         </div>
//       </header>

//       <main className="py-8">
//         <CreateShortUrl onUrlCreated={() => setRefreshList(!refreshList)} />
//         <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//         <UrlList searchQuery={searchQuery} key={refreshList} />
//       </main>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Container, Typography } from '@mui/material';
import CreateShortUrl from './components/CreateShortUrl';
import UrlList from './components/UrlList';
import SearchBar from './components/SearchBar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshList, setRefreshList] = useState(false);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <CreateShortUrl onUrlCreated={() => setRefreshList(!refreshList)} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <UrlList searchQuery={searchQuery} key={refreshList} />
      </Container>
    </>
  );
}

export default App;