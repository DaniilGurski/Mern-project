import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// TODO: We need a route for a page with edit form (should it be a seperate route (/edit) or an extention of admin (/admin/3) ?)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);
