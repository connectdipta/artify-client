import React, { useState } from "react";
import { createArtwork } from "../services/artworks";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";
import { FiUpload } from "react-icons/fi"; // Added icon for the button

export default function AddArtwork() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    imageUrl: "",
    category: "",
    medium: "",
    description: "",
    dimensions: "",
    price: "",
    visibility: "Public"
  });

  // Your handleChange function is perfect
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Your handleSubmit function is perfect
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, imageUrl, category } = form;
    if (!title || !imageUrl || !category) {
      Swal.fire("Missing Fields", "Title, image URL and category are required", "warning");
      return;
    }

    try {
      setLoading(true);
      await createArtwork(form);
      Swal.fire("Success", "Artwork added successfully!", "success");
      setForm({
        title: "",
        imageUrl: "",
        category: "",
        medium: "",
        description: "",
        dimensions: "",
        price: "",
        visibility: "Public"
      });
    } catch (err) {
      console.error("Artwork creation failed:", err);
      Swal.fire("Error", "Failed to add artwork", "error");
    } finally {
      setLoading(false);
    }
  };

  // Your loading state is perfect
  if (loading) return <Spinner />;

  return (
    // Upgraded: Wider container with vertical padding
    <div className="max-w-4xl mx-auto p-4 md:p-8 my-10">
      {/* Upgraded: Card wrapper for a consistent feel */}
      <div className="bg-base-100 rounded-2xl shadow-2xl p-8">
        
        {/* Upgraded: Gradient header */}
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Add Your Masterpiece
        </h2>

        {/* Upgraded: 2-column grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Title (col 1) */}
          <div>
            <label className="label font-semibold">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input input-primary w-full" // Upgraded
              placeholder="Enter artwork title"
              required
            />
          </div>

          {/* Image URL (col 2) */}
          <div>
            <label className="label font-semibold">Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="input input-primary w-full" // Upgraded
              placeholder="httpsT://example.com/art.jpg"
              required
            />
          </div>

          {/* Category (col 1) */}
          <div>
            <label className="label font-semibold">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input input-primary w-full" // Upgraded
              placeholder="e.g. Painting, Sculpture"
              required
            />
          </div>

          {/* Medium / Tools (col 2) */}
          <div>
            <label className="label font-semibold">Medium / Tools</label>
            <input
              name="medium"
              value={form.medium}
              onChange={handleChange}
              className="input input-primary w-full" // Upgraded
              placeholder="Oil, Acrylic, Digital..."
            />
          </div>

          {/* Description (span 2) */}
          <div className="md:col-span-2">
            <label className="label font-semibold">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="textarea textarea-primary w-full" // Upgraded
              rows={3}
              placeholder="Tell us about your artwork..."
            />
          </div>

          {/* Dimensions (col 1) */}
          <div>
            <label className="label font-semibold">Dimensions (optional)</label>
            <input
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="input input-primary w-full" // Upgraded
              placeholder="e.g. 24×36 inches"
            />
          </div>

          {/* Price (col 2) */}
          <div>
            <label className="label font-semibold">Price (optional)</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              className="input input-primary w-full" // Upgraded
              placeholder="Enter price in USD"
            />
          </div>

          {/* Visibility (span 2) */}
          <div className="md:col-span-2">
            <label className="label font-semibold">Visibility</label>
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="select select-primary w-full" // Upgraded
            >
              <option value="Public">🌍 Public (Visible to everyone)</option>
              <option value="Private">🔒 Private (Only visible to you)</option>
            </select>
          </div>

          {/* Submit Button (span 2) */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-full md:col-span-2 rounded-full text-lg font-semibold tracking-wide" // Upgraded
          >
            <FiUpload className="mr-2" /> Add Artwork
          </button>
        </form>
      </div>
    </div>
  );
}