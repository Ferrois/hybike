import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";

function Header() {
  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-2 py-3 bg-slate-700">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <div className="text-md font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
            Hybike
          </div>
          <div className="w-auto text-sm flex gap-2 text-gray-200">
          <Link to="/">Home</Link>
          <Link to="/view">Kiosks</Link>
          <Link to="/loyal">Loyalty</Link></div>
        </div>
        <Profile />
      </div>
    </nav>
  );
}

export default Header;
