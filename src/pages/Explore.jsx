import React, { useEffect, useState } from "react";
import { fetchExplore, searchArtworks } from "../services/artworks";
import Swal from "sweetalert2";
import ArtworkCard from "../components/ArtworkCard";
import { FiSearch } from "react-icons/fi"; 
import Spinner from "../components/Spinner"; 

const Explore = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all public artworks initially
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await fetchExplore();
        setArtworks(data);
      } catch (err) {
        Swal.fire("Error", "Failed to load artworks", "error");
      } finally {
        setLoading(false);
      }
    };
    loadArtworks();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const data = await searchArtworks({ title: search, userName: search });
      setArtworks(data);
    } catch (err) {
      Swal.fire("Error", "Search failed", "error");
    }
  };

  return (
   <div className="container mx-auto px-4 py-10 min-h-screen">
    
    {/* 1. HEADER: Use the theme gradient */}
    <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      Explore Artworks
    </h2>

    {/* 2. SEARCH BAR: Make it cleaner and theme-aware */}
    <form
      onSubmit={handleSearch}
      className="flex justify-center gap-0 mb-12 max-w-lg mx-auto"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        // Use input-primary and remove the rounded-right
        className="input input-bordered input-primary w-full rounded-r-none"
        placeholder="Search by title or artist..."
      />
      {/* Use a button with just an icon, remove rounded-left */}
      <button type="submit" className="btn btn-primary rounded-l-none">
        <FiSearch className="text-lg" />
      </button>
    </form>

    {/* 3. LOADING/EMPTY STATES: Use your Spinner and a cleaner "No results" view */}
    {loading ? (
      <Spinner /> // Use your actual Spinner component
    ) : artworks.length === 0 ? (
      <div className="text-center text-base-content/70 py-16">
        <h3 className="text-2xl font-semibold">No Artworks Found</h3>
        <p>Try searching for something else or check back later.</p>
      </div>
    ) : (
      // 4. GRID: This is your existing grid of cards
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {artworks.map((art) => (
          <ArtworkCard key={art._id} artwork={art} />
        ))}
      </div>
    )}
  </div>
  );
};

export default Explore;
