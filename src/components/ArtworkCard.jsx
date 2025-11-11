import React from "react";
import { Link } from "react-router-dom";

export default function ArtworkCard({ artwork }) {
  if (!artwork || !artwork._id) return null;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure>
        <img
          src={artwork.imageUrl || "/placeholder.png"}
          alt={artwork.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title flex justify-between items-center">
          {artwork.title}
          <span
            className={`badge ${
              artwork.visibility === "Public" ? "badge-success" : "badge-warning"
            }`}
          >
            {artwork.visibility}
          </span>
        </h2>
        <p className="text-sm text-gray-500">{artwork.category}</p>
        <p className="text-xs">By {artwork.userName}</p>
        <p className="text-xs text-gray-600">❤️ {artwork.likes ?? 0} likes</p>

        <div className="card-actions justify-end mt-2">
          <Link to={`/artworks/${artwork._id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
