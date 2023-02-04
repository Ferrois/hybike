import React, { useState } from "react";
import Profile from "./Profile";

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  
  return (
    <nav class="w-full flex flex-wrap items-center justify-between px-2 py-3 bg-slate-700">
      <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start items-center">
          <a class="text-md font-bold inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
            Hybike
          </a>
          <Profile/>
        </div>
      </div>
    </nav>
  );
}

export default Header;
