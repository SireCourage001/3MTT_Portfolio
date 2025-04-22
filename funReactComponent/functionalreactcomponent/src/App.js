import React, { useEffect, useState } from 'react';
import ListComponent from './components/ListComponent';
import './App.css';

const UNSPLASH_ACCESS_KEY = '9Ryw8Zcza3r3lvvuPnUjzU97xKcNx6AHuptwJVg9TLQ';

function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('nature');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      setImages(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold mb-4 ">Image Gallery</h1>
  
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-lg mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for images..."
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </form>
  
      {/* 🔄 Loading & Error */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
  
      {/* 📸 Image List */}
      {!loading && !error && (
        <ListComponent
          items={images}
          renderItem={(img) => (
            <div className="image-card">
              <img src={img.urls.small} alt={img.alt_description} />
              <p className="image-description">
                {img.alt_description || 'Untitled'}
              </p>
            </div>
          )}
          emptyMessage="No images found for this search."
        />
      )}
    </div>
  );
}
    
export default App;
