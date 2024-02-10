import React, { useEffect, useState } from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import Skeleton from "../ReactSkeleton/Skeleton";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Books = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState("");

  const [loading, setLoading] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [page, setPage] = useState(1);
  const [booksData, setBooksData] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Fetching Part
  useEffect(() => {
    setTimeout(async () => {
      const response = await axios.get(
        `https://hosted-backend-online-book-store-2.onrender.com/book?page=${page}&pageSize=4`
      );

      setBooksData((prev) => [...prev, ...response.data.data]);
      // console.log(booksData);
      setInitialLoadComplete(true);
      setLoading(false);
    }, 1500);
  }, [page]);

 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  // Creating an order using post method
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("token", token);
        const response = await axios.get("https://hosted-backend-online-book-store-2.onrender.com/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("response", response);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    // console.log(selectedCardId);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("/book/search", {
        params: {
          title: searchTerm,
          writer: searchTerm,
          tag: searchTerm,
          page: 1,
          pageSize: 10,
        },
      });
      setSearchResults(response.data);
      // console.log("SearchResults", response.data.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleOrder = async (bookId) => {
    try {
      // console.log("bookID", bookId);
      setOrderLoading(true); // Set loading state to true when order process starts

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://hosted-backend-online-book-store-2.onrender.com/order/create",
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const successMessage = response.data.message
        ? response.data.message
        : " BoughtI Successfully";
      showToast("success", successMessage);


      setOrderLoading(false); // Set loading state to false after fetching is done
    } catch (error) {
      // Handle error if needed
      // console.error(error);
      const errorMessage =
        error.response + " You should Buy Points from Our Store "
          ? error.response.data.message
          : "An error occurred";
      showToast("error", errorMessage);
      setOrderLoading(false); // Set loading state to false after fetching is done
    }
  };

  // Function to show Toastify message
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
    <>
      <div className="mt-14 mb-12">
        <div className="container">
          {/* header */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 className="text-3xl font-bold"> Look At Our Books Below </h1>
          </div>

          {/* Body section */}
          <div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-2/3 p-4 mb-10 text-sm text-gray-900  focus:outline-none border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your search term"
            />

            {initialLoadComplete && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {/* Card */}
                {booksData
                  .filter(({ title, writer, tag }) =>
                    [title, writer, tag].some((field) =>
                      field.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )

                  .map(({ id, coverImageUrl, title, point, writer, tag },index) => (
                    <div
                      key={index}
                      className="border border-gray-200 shadow-lg rounded-md overflow-hidden mx-4 sm:mx-0"
                      onClick={() => handleCardClick(id)}
                    >
                      <img
                        src={coverImageUrl}
                        alt=""
                        className="h-48  sm:h-56 md:h-60 lg:h-64 xl:h-72 object-cover transform hover:scale-125 transition-transform duration-300 w-full"
                      />
                      <div className="p-4">
                        <div className="overflow-hidden">
                          <h3 className="font-semibold text-lg" title={title}>
                            {title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-700">{writer}</p>
                        <div className="flex items-center gap-1">
                          <span className="">Price: {point}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-lg">Tag: {tag}</span>
                        </div>
                        <button
                          onClick={() => handleOrder(id)}
                          className="bg-primary hover:scale-105 text-white py-1 px-4 rounded-full mt-4"
                        >
                          {orderLoading ? "Ordering..." : "Order Now"}
                        </button> <button
                          onClick={() => handleOrder(id)}
                          className="bg-primary hover:scale-105 text-white py-1 px-4 rounded-full mt-4"
                        >
                          {orderLoading ? "Buying..." : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <Loading />
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Books;
