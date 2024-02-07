import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./components/Signup/SignUp.jsx";
import SignIn from "./components/SignIn/SignIn.jsx";
import BookDetails from "./components/BookDetails/BookDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div> <App/> </div>,
  },
  {
    path: "/sign-in",
    element: <div> <SignIn/> </div>,
  },
  {
    path: "/sign-up",
    element: <div> <SignUp/> </div>,
  },
  {
    path: '/books/:id',
    element: <div> <BookDetails/> </div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);