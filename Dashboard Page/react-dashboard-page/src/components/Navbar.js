import React from "react";

import UserDropdown from "./UserDropdown.js";

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white uppercase hidden lg:inline-block font-semibold"
            href="https://www.creative-tim.com/learning-lab/tailwindcss-starter-project#/dashboard"
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="mr-3 md:flex hidden flex-row flex-wrap items-center lg:ml-auto">
            <div className="relative flex w-full flex-wrap items-stretch">
              <div className="flex">
                <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-gray-200 placeholder-gray-300 text-gray-100 bg-transparent rounded-full text-base items-center rounded-r-none pl-3 py-2 border-r-0">
                  <i className="fas fa-search"></i>
                </span>
              </div>
              <input
                type="text"
                placeholder="Placeholder"
                className="px-3 py-2 h-12 border border-solid  border-gray-200 placeholder-gray-200 text-white bg-transparent rounded-full text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0"
              />
            </div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
