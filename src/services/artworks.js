import api from "../api";

export const fetchArtworks = () => api.get("/artworks").then(r => r.data);
export const fetchFeatured = () => api.get("/artworks/featured").then(r => r.data);
export const fetchExplore = (params) => api.get("/artworks/explore", { params }).then(r => r.data);
export const searchArtworks = (params) => api.get("/artworks/search", { params }).then(r => r.data);

export const createArtwork = (payload) => api.post("/artworks", payload).then(r => r.data);
export const updateArtwork = (id, payload) => api.put(`/artworks/${id}`, payload).then(r => r.data);
export const deleteArtwork = (id) => api.delete(`/artworks/${id}`).then(r => r.data);

export const likeArtwork = (id) => api.patch(`/artworks/${id}/like`).then(r => r.data);
