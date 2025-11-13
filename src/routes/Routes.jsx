import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import AddArtwork from "../pages/AddArtwork";
import MyGallery from "../pages/MyGallery";
import MyFavorites from "../pages/MyFavorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import ViewDetails from "../pages/ViewDetails"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      {
        path: "add-artwork",
        element: (
          <ProtectedRoute>
            <AddArtwork />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-gallery",
        element: (
          <ProtectedRoute>
            <MyGallery />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <ProtectedRoute>
            <MyFavorites />
          </ProtectedRoute>
        ),
      },
      {
        path: "artworks/:id",
        element: (
          <ProtectedRoute>
            <ViewDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
