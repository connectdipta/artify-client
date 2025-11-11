import api from "../api";
import { getAuth } from "firebase/auth";

/**
 * Fetch all artworks
 */
export const fetchArtworks = async () => {
  try {
    const res = await api.get("/artworks");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch artworks:", err);
    throw err;
  }
};

/**
 * Fetch featured artworks
 */
export const fetchFeatured = async () => {
  try {
    const res = await api.get("/artworks/featured");
    return res.data;
  } catch (err) {
    console.error("Failed to fetch featured artworks:", err);
    throw err;
  }
};

/**
 * Fetch explore artworks with filters
 */
export const fetchExplore = async (params) => {
  try {
    const res = await api.get("/artworks/explore", { params });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch explore artworks:", err);
    throw err;
  }
};

/**
 * Search artworks
 */
export const searchArtworks = async (params) => {
  try {
    const res = await api.get("/artworks/search", { params });
    return res.data;
  } catch (err) {
    console.error("Failed to search artworks:", err);
    throw err;
  }
};

/**
 * Create a new artwork (requires Firebase token)
 */
export const createArtwork = async (payload) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.post("/artworks", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Update an artwork by ID (requires Firebase token)
 */
export const updateArtwork = async (id, payload) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.put(`/artworks/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Delete an artwork by ID (requires Firebase token)
 */
export const deleteArtwork = async (id) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.delete(`/artworks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Like an artwork (public)
 */
export const likeArtwork = async (id) => {
  try {
    const res = await api.patch(`/artworks/${id}/like`);
    return res.data;
  } catch (err) {
    console.error("Failed to like artwork:", err);
    throw err;
  }
};

/**
 * Fetch single artwork by ID
 */
export const getArtworkById = async (id) => {
  try {
    const res = await api.get(`/artworks/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch artwork by ID:", err);
    throw err;
  }
};

/**
 * Fetch artworks for a specific user
 */
export const getUserArtworks = async (email) => {
  try {
    const res = await api.get(`/artworks/user/${email}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch user artworks:", err);
    throw err;
  }
};

/**
 * Add to favorites (requires Firebase token)
 */
export const addFavorite = async (artworkId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.post(
    "/favorites",
    { artworkId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

/**
 * Get favorites for logged-in user (requires Firebase token)
 */
export const getFavorites = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.get("/favorites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

/**
 * Remove favorite by ID (requires Firebase token)
 */
export const removeFavorite = async (id) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const res = await api.delete(`/favorites/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
