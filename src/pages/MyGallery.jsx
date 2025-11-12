import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getUserArtworks,
  deleteArtwork,
  updateArtwork,
} from "../services/artworks";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const getSwalTheme = () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") {
    return {
      background: "#2A2F3A",
      color: "#ffffff",
    };
  }
  return {
    background: "oklch(98% 0.02 250)",
    color: "oklch(20% 0.07 250)",
  };
};

const MyGallery = () => {
  const { user, loading: authLoading } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [editingArt, setEditingArt] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    setPageLoading(true);
    const fetchMyArtworks = async () => {
      try {
        const data = await getUserArtworks(user.email);
        setArtworks(data);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to load your artworks",
          icon: "error",
          ...getSwalTheme(),
        });
      } finally {
        setPageLoading(false);
      }
    };

    fetchMyArtworks();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This artwork will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "oklch(var(--color-error))",
      ...getSwalTheme(),
    });

    if (result.isConfirmed) {
      try {
        await deleteArtwork(id);
        setArtworks((prev) => prev.filter((art) => art._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your artwork has been removed.",
          icon: "success",
          confirmButtonColor: "oklch(var(--color-primary))",
          ...getSwalTheme(),
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete artwork",
          icon: "error",
          confirmButtonColor: "oklch(var(--color-error))",
          ...getSwalTheme(),
        });
      }
    }
  };

  const openUpdateModal = (art) => {
    setEditingArt(art);
    setFormData({
      title: art.title,
      description: art.description || "",
      category: art.category || "",
      imageUrl: art.imageUrl || "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateArtwork(editingArt._id, formData);
      setArtworks((prev) =>
        prev.map((art) =>
          art._id === editingArt._id ? { ...art, ...formData } : art
        )
      );
      setEditingArt(null);
      Swal.fire({
        title: "Success",
        text: "Artwork updated successfully!",
        icon: "success",
        confirmButtonColor: "oklch(var(--color-primary))",
        ...getSwalTheme(),
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to update artwork",
        icon: "error",
        confirmButtonColor: "oklch(var(--color-error))",
        ...getSwalTheme(),
      });
    }
  };

  if (authLoading || pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4 py-10 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        My Gallery
      </h2>

      {artworks.length === 0 ? (
        <div className="text-center text-base-content/70 py-16">
          <h3 className="text-2xl font-semibold">Your gallery is empty</h3>
          <p className="mb-6">Start your collection by adding your first piece.</p>
          <Link
            to="/add-artwork"
            className="btn btn-primary btn-lg rounded-full"
          >
            <FiPlus className="mr-2" /> Upload Artwork
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="group rounded-2xl p-1.5 bg-gradient-to-br from-primary via-secondary to-accent transition-all duration-400 ease-in-out hover:shadow-2xl hover:shadow-secondary/30"
            >
              <div className="card bg-base-100 rounded-xl overflow-hidden shadow-lg transition-all duration-400 ease-in-out transform group-hover:-translate-y-1 h-full">
                <figure className="h-56 overflow-hidden relative">
                  <Link to={`/artworks/${art._id}`}>
                    <img
                      src={art.imageUrl || "/placeholder.png"}
                      alt={art.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </Link>
                </figure>

                <div className="card-body p-5">
                  <span className="badge badge-secondary badge-outline text-xs mb-2 uppercase tracking-wide">
                    {art.category}
                  </span>
                  <h2
                    className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate h-7 mb-3"
                    title={art.title}
                  >
                    {art.title}
                  </h2>
                  <p className="text-sm text-base-content/70 h-10 overflow-hidden">
                    {art.description}
                  </p>
                  
                  <div className="card-actions justify-end gap-2 mt-4">
                    <button
                      onClick={() => openUpdateModal(art)}
                      className="btn btn-secondary btn-sm rounded-full"
                    >
                      <FiEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(art._id)}
                      className="btn btn-error btn-sm rounded-full"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingArt && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-lg relative">
            
            <button
              onClick={() => setEditingArt(null)}
              className="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="text-2xl font-bold mb-6">Update Artwork</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-primary w-full"
                placeholder="Title"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="textarea textarea-primary w-full"
                placeholder="Description"
                rows={3}
              />
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.Garget.value })
                }
                className="input input-primary w-full"
                placeholder="Category"
              />
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="input input-primary w-full"
                placeholder="Image URL"
              />
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingArt(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;