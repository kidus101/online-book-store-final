import React from "react";
import Book1 from "../../assets/books/book1.jpg";
import Book2 from "../../assets/books/book2.jpg";
import Book3 from "../../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa6";

const booksData = [
  {
    id: 1,
    img: Book1,
    title: "The Power of Now",
    Price: "$15",
    author: "Eckhart Tolle",
    tag: "Non-fiction",
  },
  {
    id: 2,
    img: Book2,
    title: "Atomic Habits",
    Price: "$20",
    author: "James Clear",
    tag: "Self-help",
  },
  {
    id: 3,
    img: Book3,
    title: "The Alchemist",
    Price: "$25",
    author: "Paulo Coelho",
    tag: "Fiction",
  },
  {
    id: 4,
    img: Book2,
    title: "Think and Grow",
    Price: "$25",
    author: "Napoleon Hill",
    tag: "Non-fiction",
  },
  {
    id: 5,
    img: Book1,
    title: "You Are a Badass",
    Price: "$10",
    author: "Jen Sincero",
    tag: "Self-help",
  },
  {
    id: 6,
    img: Book1,
    title: "Deep Work",
    Price: "$12",
    author: "Cal Newport",
    tag: "Non-fiction",
  },
  {
    id: 7,
    img: Book2,
    title: "Ikigai",
    Price: "$27",
    author: "Carol S. Dweck",
    tag: "Non-fiction",
  },
  {
    id: 8,
    img: Book3,
    title: "Daring Greatly",
    Price: "$5",
    author: "Brené Brown",
    tag: "Self-help",
  },
  {
    id: 9,
    img: Book2,
    title: "Eat Pray Love",
    Price: "$10",
    author: "Elizabeth Gilbert",
    tag: "Non-fiction",
  },
  {
    id: 10,
    img: Book1,
    title: "The Four Agreements",
    Price: "$25",
    author: "Don Miguel Ruiz",
    tag: "Self-help",
  }
];

const Books = () => {
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
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {/* Card */}
              {booksData.map(({ id, img, title, Price, author , tag  }) => (
                <div
                  key={id}
                  className=" border border-gray-200 shadow-lg px-10 div space-y-2"
                >
                  <img
                    src={img}
                    alt=""
                    className="h-[220px] mt-4 w-[150px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-700">{author}</p>
                    <div className="flex ml-8 mt-1 items-center gap-1">
                      <span className=" ">{Price}</span>
                    </div>
                    <div className="flex ml-4 mt-1 items-center gap-1">
                      <span className=" font-bold text-lg ">{tag}</span>
                    </div>

                    <button className="bg-primary hover:scale-105 mb-4 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="flex justify-center">
              <button className="text-center mt-10 cursor-pointer  bg-primary text-white py-1 px-5 rounded-md">
                View All Books
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
