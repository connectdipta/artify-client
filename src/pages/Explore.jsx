import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExplore, searchArtworks } from "../services/artworks";
import Swal from "sweetalert2";

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
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Explore Artworks</h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center gap-2 mb-6"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-1/2"
          placeholder="Search by title or artist..."
        />
        <button type="submit" className="btn btn-primary">
          🔍 Search
        </button>
      </form>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading artworks...</p>
      ) : artworks.length === 0 ? (
        <p className="text-center text-gray-500">No artworks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={art.imageUrl || "/placeholder.png"}
                  alt={art.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{art.title}</h3>
                <p className="text-sm text-gray-600">
                  👤 {art.userName || "Unknown Artist"}
                </p>
                <p className="text-sm">📂 {art.category}</p>
                <p className="text-sm">👍 {art.likes ?? 0} likes</p>
                <div className="card-actions justify-end mt-2">
                  <Link to={`/artworks/${art._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
