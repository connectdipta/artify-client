import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtworkById, likeArtwork, addFavorite } from "../services/artworks";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

export default function ViewDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (!id) throw new Error("Missing artwork ID");
        const data = await getArtworkById(id);
        if (!data || !data._id) throw new Error("Artwork not found");
        setArtwork(data);

        const likedArtworks = JSON.parse(localStorage.getItem("likedArtworks") || "[]");
        if (likedArtworks.includes(id)) setLiked(true);
      } catch (err) {
        console.error("Error fetching artwork:", err);
        Swal.fire("Error", "Failed to load artwork details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);

  const handleLike = async () => {
    if (liked) return Swal.fire("Info", "You already liked this artwork", "info");
    try {
      await likeArtwork(id);
      setArtwork((prev) => ({ ...prev, likes: (prev.likes ?? 0) + 1 }));
      setLiked(true);
      const likedArtworks = JSON.parse(localStorage.getItem("likedArtworks") || "[]");
      localStorage.setItem("likedArtworks", JSON.stringify([...likedArtworks, id]));
    } catch (err) {
      Swal.fire("Error", "Failed to like artwork", "error");
    }
  };

  const handleFavorite = async () => {
    try {
      await addFavorite(id);
      setFavorited(true);
      Swal.fire("Success", "Added to favorites!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to add favorite", "error");
    }
  };

  if (loading) return <Spinner />;
  if (!artwork)
    return (
      <div className="text-center mt-10">
        <p className="text-lg">No artwork found.</p>
        <Link to="/explore" className="btn btn-primary mt-4">
          ⬅ Back to Explore
        </Link>
      </div>
    );
console.log("Route param ID:", id);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow rounded">
      <img
        src={artwork.imageUrl || "/placeholder.png"}
        alt={artwork.title}
        className="w-full h-96 object-cover rounded mb-6"
      />

      <h2 className="text-3xl font-bold mb-2">{artwork.title}</h2>
      <p className="text-gray-600 mb-2">Category: {artwork.category}</p>
      <p className="text-gray-600 mb-2">Medium: {artwork.medium || "N/A"}</p>
      <p className="mb-6">{artwork.description || "No description provided."}</p>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-xl font-semibold mb-2">Artist Info</h3>
        <p>Name: {artwork.userName || "Anonymous"}</p>
        <p>Email: {artwork.userEmail || "Not available"}</p>
        {artwork.artistPhoto && (
          <img
            src={artwork.artistPhoto}
            alt={artwork.userName}
            className="w-16 h-16 rounded-full mt-2"
          />
        )}
        {artwork.totalArtworks && <p>Total artworks: {artwork.totalArtworks}</p>}
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={handleLike} className="btn btn-primary" disabled={liked}>
          👍 Like ({artwork.likes ?? 0})
        </button>
        <button onClick={handleFavorite} disabled={favorited} className="btn btn-secondary">
          ❤️ {favorited ? "Favorited" : "Add to Favorites"}
        </button>
        <Link to="/explore" className="btn btn-outline">
          ⬅ Back to Explore
        </Link>
      </div>
    </div>
  );
}
