import React, { useState } from "react";
import { createArtwork } from "../services/artworks";
import Spinner from "../components/Spinner";
import Swal from "sweetalert2";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

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

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-base-100 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold text-center text-primary mb-6">
    ➕ Add New Artwork
  </h2>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
    {/* Title */}
    <div>
      <label className="label font-semibold">Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Enter artwork title"
        required
      />
    </div>

    {/* Image URL */}
    <div>
      <label className="label font-semibold">Image URL</label>
      <input
        name="imageUrl"
        value={form.imageUrl}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="https://example.com/art.jpg"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label className="label font-semibold">Category</label>
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="e.g. Painting, Sculpture"
        required
      />
    </div>

    {/* Medium / Tools */}
    <div>
      <label className="label font-semibold">Medium / Tools</label>
      <input
        name="medium"
        value={form.medium}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="Oil, Acrylic, Digital..."
      />
    </div>

    {/* Description */}
    <div>
      <label className="label font-semibold">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
        rows={3}
        placeholder="Tell us about your artwork..."
      />
    </div>

    {/* Dimensions */}
    <div>
      <label className="label font-semibold">Dimensions (optional)</label>
      <input
        name="dimensions"
        value={form.dimensions}
        onChange={handleChange}
        className="input input-bordered w-full"
        placeholder="e.g. 24×36 inches"
      />
    </div>

    {/* Price */}
    <div>
      <label className="label font-semibold">Price (optional)</label>
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        className="input input-bordered w-full"
        placeholder="Enter price in USD"
      />
    </div>

    {/* Visibility */}
    <div>
      <label className="label font-semibold">Visibility</label>
      <select
        name="visibility"
        value={form.visibility}
        onChange={handleChange}
        className="select select-bordered w-full"
      >
        <option value="Public">🌍 Public</option>
        <option value="Private">🔒 Private</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="btn btn-primary w-full text-lg font-semibold tracking-wide"
    >
      🚀 Add Artwork
    </button>
  </form>
</div>

  );
}
