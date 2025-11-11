import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  getUserArtworks,
  deleteArtwork,
  updateArtwork,
} from "../services/artworks";
import Swal from "sweetalert2";

const MyGallery = () => {
  const { user, loading } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [editingArt, setEditingArt] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyArtworks = async () => {
      try {
        const data = await getUserArtworks(user.email);
        setArtworks(data);
      } catch (err) {
        Swal.fire("Error", "Failed to load your artworks", "error");
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
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteArtwork(id);
        setArtworks((prev) => prev.filter((art) => art._id !== id));
        Swal.fire("Deleted!", "Your artwork has been removed.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete artwork", "error");
      }
    }
  };

  const openUpdateModal = (art) => {
    setEditingArt(art);
    setFormData({
      title: art.title,
      description: art.description,
      category: art.category || "",
      imageUrl: art.imageUrl || "",
    });
  };

  const handleUpdate = async () => {
    try {
      await updateArtwork(editingArt._id, formData);
      setArtworks((prev) =>
        prev.map((art) =>
          art._id === editingArt._id ? { ...art, ...formData } : art
        )
      );
      setEditingArt(null);
      Swal.fire("Success", "Artwork updated successfully!", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update artwork", "error");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading your gallery...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Gallery</h2>

      {artworks.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500">You haven’t uploaded any artworks yet.</p>
          <Link to="/add-artwork" className="btn btn-primary mt-4">
            ➕ Upload Artwork
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((art) => (
            <div
              key={art._id}
              className="border rounded-lg p-2 shadow hover:shadow-lg transition"
            >
              <Link to={`/artworks/${art._id}`}>
                <img
                  src={art.imageUrl || art.image || "/placeholder.png"}
                  alt={art.title}
                  className="w-full h-48 object-cover rounded"
                />
              </Link>
              <h3 className="font-semibold mt-2">{art.title}</h3>
              <p className="text-sm text-gray-600">{art.description}</p>
              <p className="text-sm mt-1">👍 {art.likes ?? 0} likes</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => openUpdateModal(art)}
                  className="btn btn-sm btn-warning"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => handleDelete(art._id)}
                  className="btn btn-sm btn-error"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingArt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Artwork</h3>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input input-bordered w-full mb-3"
              placeholder="Title"
            />
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="textarea textarea-bordered w-full mb-3"
              placeholder="Description"
            />
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="input input-bordered w-full mb-3"
              placeholder="Category"
            />
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="input input-bordered w-full mb-3"
              placeholder="Image URL"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingArt(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleUpdate} className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
