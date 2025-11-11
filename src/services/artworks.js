import api from "../api";
import { getAuth } from "firebase/auth";

/**
 * Fetch all artworks
 */
export const fetchArtworks = async () => {
  const res = await api.get("/artworks");
  return res.data;
};

/**
 * Fetch featured artworks
 */
export const fetchFeatured = async () => {
  const res = await api.get("/artworks/featured");
  return res.data;
};

/**
 * Fetch explore artworks with filters
 */
export const fetchExplore = async (params) => {
  const res = await api.get("/artworks/explore", { params });
  return res.data;
};

/**
 * Search artworks
 */
export const searchArtworks = async (params) => {
  const res = await api.get("/artworks/search", { params });
  return res.data;
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
  const res = await api.patch(`/artworks/${id}/like`);
  return res.data;
};

/**
 * Fetch single artwork by ID
 */
export const getArtworkById = async (id) => {
  const res = await api.get("/artworks/search", { params: { _id: id } });
  return res.data[0];
};

/**
 * Fetch artworks for a specific user
 */
export const getUserArtworks = async (email) => {
  const res = await api.get(`/artworks/user/${email}`);
  return res.data;
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
