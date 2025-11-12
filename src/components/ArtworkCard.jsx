import React from "react";
import { Link } from "react-router-dom";
// Import icons for a cleaner, more modern UI
import { FiHeart, FiUser } from "react-icons/fi";

export default function ArtworkCard({ artwork }) {
  if (!artwork || !artwork._id) return null;

  // Fallback for missing images
  const imageUrl = artwork.imageUrl || "/placeholder.png";
  const artistName = artwork.userName || "Unknown Artist";
  const likes = artwork.likes ?? 0;

  return (
    // We use `group` here to control hover effects on child elements
    <div className="group rounded-2xl p-1.5 bg-gradient-to-br from-primary via-secondary to-accent transition-all duration-400 ease-in-out hover:shadow-2xl hover:shadow-secondary/30">
      
      <div className="card bg-base-100 rounded-xl overflow-hidden shadow-lg transition-all duration-400 ease-in-out transform group-hover:-translate-y-1">
        
        {/* --- Artwork Image --- */}
        {/* 'overflow-hidden' on the container clips the scaling image */}
        <figure className="h-56 overflow-hidden relative">
          <img
            src={imageUrl}
            alt={artwork.title || "Artwork"}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          {/* Subtle inner shadow effect on the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          
          {/* Visibility Badge (Top Right) */}
          <span
            className={`badge absolute top-3 right-3 text-xs px-3 py-2 backdrop-blur-sm border-0 ${
              artwork.visibility === "Public"
                ? "bg-success/70 text-success-content"
                // Using 'warning' from your theme for 'Private'
                : "bg-warning/70 text-warning-content"
            }`}
          >
            {artwork.visibility}
          </span>
        </figure>

        {/* --- Card Content --- */}
        <div className="card-body p-5">
          
          {/* Category Badge */}
          <span className="badge badge-secondary badge-outline text-xs mb-2 uppercase tracking-wide">
            {artwork.category}
          </span>

          {/* Title */}
          {/* Using your theme's 'primary' and 'secondary' for the gradient text */}
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate h-7 mb-3" title={artwork.title}>
            {artwork.title}
          </h2>

          {/* Artist Info */}
          <div className="flex items-center gap-2 text-base-content/80 mb-4">
            <FiUser className="text-primary" />
            <span className="text-sm font-medium">{artistName}</span>
          </div>

          {/* --- Card Footer: Likes + CTA --- */}
          <div className="card-actions justify-between items-center mt-auto">
            
            {/* Likes Count */}
            <div className="flex items-center gap-1.5 text-base-content/70">
              <FiHeart className="text-secondary" />
              <span className="text-sm font-medium">{likes}</span>
              <span className="text-sm text-base-content/60">likes</span>
            </div>
            
            {/* View Details Button */}
            <Link
              to={`/artworks/${artwork._id}`}
              className="btn btn-primary btn-sm rounded-full px-5 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/40 group-hover:scale-105 transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}