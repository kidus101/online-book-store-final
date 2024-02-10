import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const BooksBought = () => {
  const [orders, setOrders] = useState([]);
  const [singleBookData, setSingleBookData] = useState([]);
  const [bookIdArray, setBookIdArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [orderedBooksResponse, setOrderedBooksResponse] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://hosted-backend-online-book-store-2.onrender.com/order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderedResponse = response.data;
      setOrders(orderedResponse);
      // console.log("order" , orders)

      // Extract bookIds from orderedResponse
      const extractedBookIds = orderedResponse.map((order) => order.id);
      setBookIdArray(extractedBookIds);

      // Fetch books by their IDs
      await fetchBooksByIds(extractedBookIds);
      // console.log("extractedBookIds:", extractedBookIds);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooksByIds = async (extractedBookIds) => {
    try {
      const token = localStorage.getItem("token");
      const newOrderedBooksResponse = [];

      for (const bookId of extractedBookIds) {
        const SingleBookresponse = await axios.get(
          `https://hosted-backend-online-book-store-2.onrender.com/book/${bookId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const singleBookData = SingleBookresponse.data.data;
        // console.log("singleBookData for ID", bookId, ":", singleBookData);
        newOrderedBooksResponse.push(singleBookData);
      }

      setOrderedBooksResponse(newOrderedBooksResponse);

      await logOrderedBooksResponse(newOrderedBooksResponse);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logOrderedBooksResponse = async (newOrderedBooksResponse) => {
    // console.log("Logging newOrderedBooksResponse:", newOrderedBooksResponse);
  };

  const handleCancelOrder = async (bookId, orders) => {
    try {
      setLoadingCancel(true);
      // Iterate through the orders to find the matching order

      const updatedBooksResponse = orderedBooksResponse.filter(
        (book) => book.id !== bookId
      );
      setOrderedBooksResponse(updatedBooksResponse);
    } catch (error) {
      console.log("Error finding order ID:", error);
      return null;
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex mt-10 mb-56 justify-center relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-2 w-2"></div>
        </div>
      )}
      <div
        className={`overflow-auto md:overflow-x-auto md:overflow-y-auto shadow-lg rounded-lg ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : orderedBooksResponse.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="text-center my-[10px] text-gray-600 dark:text-gray-400">
              <p className="text-4xl p-10">You don't have any ordered books.</p>
              <p> Go to choose books here. </p>
              <Link to="/books">
                <button className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:text-gray-100 transition duration-300 ease-in-out">
                  Go to See the Books List
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Cover Image</th>
                <th className="px-6 py-3">Writer</th>
                <th className="px-6 py-3">Point</th>
                <th className="px-6 py-3">Tag</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderedBooksResponse.map((book) => (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{book.id}</td>
                  <td className="px-6 py-4">{book.title}</td>
                  <td className="px-6 py-4">
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">{book.writer}</td>
                  <td className="px-6 py-4">{book.point}</td>
                  <td className="px-6 py-4">{book.tag}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleCancelOrder(book.id, orders)}
                      className="py-2 px-4 border border-white rounded bg-red-500 text-white font-md hover:bg-red-300 hover:text-black"
                      disabled={loadingCancel} // Disable button during cancellation
                    >
                      {loadingCancel ? "Canceling Bought..." : "Cancel Bought"}
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksBought;
