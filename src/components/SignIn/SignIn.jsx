import React, { useState } from "react";
import axios from "axios";
import { useNavigate, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../BooksSlider/Loading";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loadingSignUp, setloadingSignUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloadingSignUp(true);

    try {
      const response = await axios.post("https://hosted-backend-online-book-store-2.onrender.com/user/login", {
        email,
        password,
      });

      // Handle the response as needed
      console.log(response.data);

      if (response.data.token) {
        // Store the token in localStorage
        const token = response.data.token;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 3); // Set expiration to 3 days from now
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationDate.toISOString());

        navigate("/books");
      }
    } catch (error) {
      // Handle any error that occurred during the request
      const errorMessage =
        error.response + " You should Buy Points from Our Store "
          ? error.response.data.message
          : "An error occurred";

      showToast("error", errorMessage);

      console.error(error);
      setloadingSignUp(false);
    }
  };

  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastify-success",
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastify-error",
      });
    }
  };

  return (
    <section className="relative bg-gray-50">
      {loadingSignUp && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          Online Book Store Sign In
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={loadingSignUp} // Disable button during sign-up process
              >
                {loadingSignUp ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignIn;
