import React, { useEffect, useState } from "react";
import { fetchFeatured } from "../services/artworks";
import Spinner from "../components/Spinner";
import ArtworkCard from "../components/ArtworkCard";

export default function FeaturedArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchFeatured()
      .then(data => {
        if (mounted) setArtworks(data);
      })
      .catch(err => console.error("Error fetching artworks:", err))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-10">

      {/* Featured artworks section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Featured Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map(art => (
            <ArtworkCard key={art._id} artwork={art} />
          ))}
        </div>
      </section>
    </div>
  );
}
