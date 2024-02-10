  import React from "react";
  import ReactDOM from "react-dom/client";
  import { createBrowserRouter, RouterProvider } from "react-router-dom";
  import "./index.css";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import Navbar from "./components/Navbar/Navbar.jsx";
  import Footer from "./components/Footer/Footer.jsx";
  import App from "./App.jsx";
  import SignUp from "./components/Signup/SignUp.jsx";
  import SignIn from "./components/SignIn/SignIn.jsx";
  import BooksBought from "./components/BooksBought/BooksBought.jsx";
  import OrderedBooks from "./components/OrderedBooks.jsx/OrderedBooks.jsx";
  import { Navigate } from "react-router-dom";
import Books from "./components/BooksSlider/Books.jsx";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/sign-up" />,
    },
    {
      path: "/sign-in",
      element: (
        <>
          <SignIn />
        </>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    {
      path: "/books",
      element: (
        <>
          <Books />
        </>
      ),
    },
    {
      path: "/books-bought",
      element: (
        <>
          <Navbar />
          <BooksBought />
          <Footer />
        </>
      ),
    },
    {
      path: "/ordered-books",
      element: (
        <>
          <Navbar />
          <OrderedBooks />
          <Footer />
        </>
      ),
    },
  ]);
  

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );