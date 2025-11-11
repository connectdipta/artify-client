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
    <div className="max-w-xl mx-auto p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">➕ Add New Artwork</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control">
          <span className="label-text">Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control">
          <span className="label-text">Image URL</span>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control">
          <span className="label-text">Category</span>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </label>

        <label className="form-control">
          <span className="label-text">Medium / Tools</span>
          <input
            name="medium"
            value={form.medium}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered"
            rows={3}
          />
        </label>

        <label className="form-control">
          <span className="label-text">Dimensions (optional)</span>
          <input
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Price (optional)</span>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            className="input input-bordered"
          />
        </label>

        <label className="form-control">
          <span className="label-text">Visibility</span>
          <select
            name="visibility"
            value={form.visibility}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </label>

        <button type="submit" className="btn btn-primary w-full">Add Artwork</button>
      </form>
    </div>
  );
}
