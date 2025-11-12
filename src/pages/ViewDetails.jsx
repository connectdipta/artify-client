import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArtworkById, likeArtwork, addFavorite } from "../services/artworks";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { 
  FiHeart, 
  FiStar, 
  FiArrowLeft, 
  FiTag, 
  FiPenTool,  // <-- CHANGED from FiPaintbrush
  FiMaximize, 
  FiDollarSign 
} from "react-icons/fi";

// --- THEME FIX: Helper function to get correct SweetAlert colors ---
const getSwalTheme = () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    return { background: "#2A2F3A", color: "#ffffff" };
  }
  return {
    background: "oklch(98% 0.02 250)",
    color: "oklch(20% 0.07 250)",
  };
};

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
        Swal.fire({
          title: "Error",
          text: "Failed to load artwork details",
          icon: "error",
          ...getSwalTheme(),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [id]);

  const handleLike = async () => {
    if (liked) {
      Swal.fire({
        title: "Info",
        text: "You already liked this artwork",
        icon: "info",
        ...getSwalTheme(),
      });
      return;
    }
    try {
      await likeArtwork(id);
      setArtwork((prev) => ({ ...prev, likes: (prev.likes ?? 0) + 1 }));
      setLiked(true);
      const likedArtworks = JSON.parse(localStorage.getItem("likedArtworks") || "[]");
      localStorage.setItem("likedArtworks", JSON.stringify([...likedArtworks, id]));
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to like artwork",
        icon: "error",
        ...getSwalTheme(),
      });
    }
  };

  const handleFavorite = async () => {
    try {
      await addFavorite(id);
      setFavorited(true);
      Swal.fire({
        title: "Success",
        text: "Added to favorites!",
        icon: "success",
        ...getSwalTheme(),
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to add favorite",
        icon: "error",
        ...getSwalTheme(),
      });
    }
  };

  if (loading) return <Spinner />;
  
  if (!artwork)
    return (
      <div className="container mx-auto text-center py-20 min-h-screen">
        <h2 className="text-3xl font-bold">Artwork Not Found</h2>
        <p className="text-base-content/70 mb-6">
          We couldn't find the piece you're looking for.
        </p>
        <Link to="/explore" className="btn btn-primary rounded-full">
          <FiArrowLeft className="mr-2" /> Back to Explore
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        
        <div className="w-full">
          <img
            src={artwork.imageUrl || "/placeholder.png"}
            alt={artwork.title}
            className="w-full h-auto max-h-[700px] object-contain rounded-2xl shadow-xl"
          />
        </div>

        <div className="w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {artwork.title}
          </h2>

          <div className="flex items-center gap-3 mb-6">
            <img
              src={artwork.artistPhoto || artwork.userPhotoURL || "/default-avatar.png"}
              alt={artwork.userName || "Artist"}
              className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2"
            />
            <div>
              <p className="text-lg font-semibold">{artwork.userName || "Anonymous"}</p>
              <p className="text-sm text-base-content/70">{artwork.userEmail || "No contact"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="badge badge-primary badge-lg">
              <FiTag className="mr-2" /> {artwork.category}
            </span>
            {/* --- THIS IS THE FIX --- */}
            {/* Changed from FiPaintbrush to FiPenTool */}
            <span className="badge badge-secondary badge-lg">
              <FiPenTool className="mr-2" /> {artwork.medium || "N/A"}
            </span>
            {artwork.dimensions && (
              <span className="badge badge-accent badge-lg text-accent-content">
                <FiMaximize className="mr-2" /> {artwork.dimensions}
              </span>
            )}
            {artwork.price && (
              <span className="badge badge-success badge-lg text-success-content">
                <FiDollarSign className="mr-2" /> {artwork.price}
              </span>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-2">About this piece</h3>
          <p className="text-base-content/80 leading-relaxed mb-8">
            {artwork.description || "No description provided."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handleLike}
              className="btn btn-primary btn-lg rounded-full"
              disabled={liked}
            >
              <FiHeart /> {liked ? "Liked" : "Like"} ({artwork.likes ?? 0})
            </button>
            <button
              onClick={handleFavorite}
              disabled={favorited}
              className="btn btn-secondary btn-lg rounded-full"
            >
              <FiStar /> {favorited ? "Favorited" : "Add to Favorites"}
            </button>
            <Link to="/explore" className="btn btn-ghost rounded-full">
              <FiArrowLeft /> Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}