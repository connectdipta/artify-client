import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { getAuth } from "firebase/auth";
import api from "../api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FiEye, FiX, FiStar } from "react-icons/fi";

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

const MyFavorites = () => {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    setPageLoading(true);
    const fetchFavorites = async () => {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        const res = await api.get("/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to load favorites",
          icon: "error",
          ...getSwalTheme(),
        });
      } finally {
        setPageLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleUnfavorite = async (id) => {
    const result = await Swal.fire({
      title: "Remove from favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      confirmButtonColor: "oklch(var(--color-error))",
      ...getSwalTheme(),
    });

    if (result.isConfirmed) {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();
        await api.delete(`/favorites/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => prev.filter((fav) => fav._id !== id));
        Swal.fire({
          title: "Removed!",
          text: "Artwork removed from favorites.",
          icon: "success",
          ...getSwalTheme(),
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to remove favorite",
          icon: "error",
          ...getSwalTheme(),
        });
      }
    }
  };

  if (loading || pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4 py-10 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        My Favorites
      </h2>

      {favorites.length === 0 ? (
        <div className="text-center text-base-content/70 py-16">
          <h3 className="text-2xl font-semibold">No favorites yet</h3>
          <p className="mb-6">
            Explore artworks and click the star to save them here.
          </p>
          <Link
            to="/explore"
            className="btn btn-primary btn-lg rounded-full"
          >
            <FiStar className="mr-2" /> Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="group rounded-2xl p-1.5 bg-gradient-to-br from-primary via-secondary to-accent transition-all duration-400 ease-in-out hover:shadow-2xl hover:shadow-secondary/30"
            >
              <div className="card bg-base-100 rounded-xl overflow-hidden shadow-lg transition-all duration-400 ease-in-out transform group-hover:-translate-y-1 h-full">
                <figure className="h-56 overflow-hidden relative">
                  <img
                    src={fav.artwork.imageUrl || "/placeholder.png"}
                    alt={fav.artwork.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </figure>

                <div className="card-body p-5">
                  <span className="badge badge-secondary badge-outline text-xs mb-2 uppercase tracking-wide">
                    {fav.artwork.category}
                  </span>
                  <h2
                    className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate h-7 mb-3"
                    title={fav.artwork.title}
                  >
                    {fav.artwork.title}
                  </h2>
                  <p className="text-sm text-base-content/70">
                    By: {fav.artwork.userName || "Unknown Artist"}
                  </p>
                  
                  <div className="card-actions justify-end gap-2 mt-4">
                    <Link
                      to={`/artworks/${fav.artwork._id}`}
                      className="btn btn-primary btn-sm rounded-full"
                    >
                      <FiEye /> View
                    </Link>
                    <button
                      onClick={() => handleUnfavorite(fav._id)}
                      className="btn btn-error btn-sm rounded-full"
                    >
                      <FiX /> Remove
                    </button>
                  </div>
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