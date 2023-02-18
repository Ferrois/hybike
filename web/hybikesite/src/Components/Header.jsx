import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-2 py-3 bg-neutral-800">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <div>
            <button
              onClick={() => handleToggle()}
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <Link
            to="/"
            className="hover:scale-110 text-white hover:text-yellow-400 transition-all"
          >
            <span className="text-md font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase ">
              HYBIKE
            </span>
          </Link>
          <div className="w-auto text-sm gap-2 text-gray-100 hidden md:flex">
            <Link
              className="hover:scale-110 hover:text-gray-300 transition-all"
              to="/dash"
            >
              <span>Dash</span>
            </Link>
            <Link
              className="hover:scale-110 hover:text-gray-300 transition-all"
              to="/view"
            >
              <span>Kiosks</span>
            </Link>
            <Link
              className="hover:scale-110 hover:text-gray-300 transition-all"
              to="/store"
            >
              <span>Store</span>
            </Link>
            <Link
              className="hover:scale-110 hover:text-gray-300 transition-all"
              to="/scan"
            >
              <span>Scan</span>
            </Link>
          </div>
        </div>
        <Profile />
      </div>
      {/* slide in navigation bar from the left */}
      <div
        className={` flex-grow items-center ${
          isOpen ? "block" : "hidden"
        } transition-all flex md:hidden`}
      >
        <ul className="flex flex-col md:flex-row list-none">
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              to="/dash"
            >
              <span className="ml-2">Dash</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              to="/view"
            >
              <span className="ml-2">Kiosks</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              to="/store"
            >
              <span className="ml-2">Store</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              to="/scan"
            >
              <span className="ml-2">Scan</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
