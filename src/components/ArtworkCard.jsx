import React from "react";
import { Link } from "react-router-dom";

export default function ArtworkCard({ artwork }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{artwork.title}</h2>
        <p className="text-sm text-gray-500">{artwork.category}</p>
        <p className="text-xs">By {artwork.userName}</p>

        <div className="card-actions justify-end mt-2">
          {/* Link to a details page (you can implement /artworks/:id route) */}
          <Link
            to={`/artworks/${artwork._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
