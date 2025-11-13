import React, { useEffect, useState } from "react";
import { searchArtworks } from "../services/artworks";
import Swal from "sweetalert2";
import ArtworkCard from "../components/ArtworkCard";
import { FiSearch } from "react-icons/fi"; 
import Spinner from "../components/Spinner"; 
import { Fade, Slide } from "react-awesome-reveal"; // Import animations

const Explore = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadArtworks = async (currentSearch, currentCategory) => {
    setLoading(true);
    try {
      const params = {};
      
      if (currentSearch) {
        params.title = currentSearch;
        params.userName = currentSearch;
      }
      
      if (currentCategory) {
        params.category = currentCategory;
      }

      const data = await searchArtworks(params);
      setArtworks(data);

    } catch (err) {
      Swal.fire("Error", "Failed to load artworks", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArtworks("", ""); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = search.trim();
    loadArtworks(searchTerm, category);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    loadArtworks(search, newCategory);
  };

  return (
    <div className="min-h-screen bg-base-100">

      <div className="bg-base-200 py-16 md:py-20 text-center">
        <Fade direction="down" triggerOnce>
          <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center justify-center gap-3">
            <FiSearch /> Explore Artworks
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            Search by title, artist, or filter by category.
          </p>
        </Fade>

        <Fade direction="up" delay={200} triggerOnce>
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto px-4"
          >
            <div className="flex w-full md:flex-grow">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full rounded-r-none bg-base-100"
                placeholder="Search by title or artist..."
              />
              <button
                type="submit"
                className="btn btn-primary rounded-l-none px-6 hover:scale-105 transition"
              >
                <FiSearch className="text-lg" />
              </button>
            </div>

            <div className="form-control w-full md:w-auto md:min-w-[200px]">
              <select 
                className="select select-bordered w-full bg-base-100"
                value={category}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                <option value="Painting">Painting</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Photography">Photography</option>
                <option value="Sculpture">Sculpture</option>
              </select>
            </div>
          </form>
        </Fade>
      </div>

      <div className="container mx-auto px-4 py-16">
        {loading ? (
          <Spinner />
        ) : artworks.length === 0 ? (
          <div className="text-center text-base-content/70 py-16">
            <h3 className="text-2xl font-semibold">No Artworks Found</h3>
            <p>Try searching for something else or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {artworks.map((art) => (
              <ArtworkCard key={art._id} artwork={art} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;