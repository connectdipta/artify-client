import api from "../api";

export const addFavorite = (artworkId) => api.post("/favorites", { artworkId }).then(r => r.data);
export const fetchFavorites = () => api.get("/favorites").then(r => r.data);
export const removeFavorite = (id) => api.delete(`/favorites/${id}`).then(r => r.data);
