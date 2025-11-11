import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { getAuth } from "firebase/auth";
import api from "../api";
import { Link } from "react-router-dom";

const MyFavorites = () => {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        const res = await api.get("/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load favorites", "error");
      }
    };

    fetchFavorites();
  }, [user]);

  // Handle unfavorite
  const handleUnfavorite = async (id) => {
    const result = await Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
    });

    if (result.isConfirmed) {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        await api.delete(`/favorites/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => prev.filter((fav) => fav._id !== id));
        Swal.fire("Removed!", "Artwork removed from favorites.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to remove favorite", "error");
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your favorites...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">❤️ My Favorites</h2>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={fav.artwork.imageUrl || "/placeholder.png"}
                  alt={fav.artwork.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{fav.artwork.title}</h3>
                <p className="text-sm text-gray-600">
                  👤 {fav.artwork.userName || "Unknown Artist"}
                </p>
                <p className="text-sm">📂 {fav.artwork.category}</p>
                <p className="text-sm">👍 {fav.artwork.likes ?? 0} likes</p>
                <div className="card-actions justify-between mt-2">
                  <Link
                    to={`/artworks/${fav.artwork._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleUnfavorite(fav._id)}
                    className="btn btn-sm btn-error"
                  >
                    ❌ Unfavorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
