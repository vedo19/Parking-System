"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isParkingHovered, setIsParkingHovered] = useState(false); // Parking hover will not be displayed by default like for others componentns in NavBar

  return (
    <nav className="bg-customPurple p-2.5 w-full z-60 h-24 flex items-center justify-center">
      <div className="nav-container flex justify-center gap-5 relative items-center">
        <Link href="/" legacyBehavior> 
          <a className="nav-item bg-yellow-400 text-black p-2.5 rounded hover:bg-blue-400 hover:text-white transform hover:scale-110 transition-all duration-500">HOME</a>
        </Link>
        <Link href="/about" legacyBehavior>
          <a className="nav-item bg-yellow-400 text-black p-2.5 rounded hover:bg-blue-400 hover:text-white transform hover:scale-110 transition-all duration-500">ABOUT</a>
        </Link>
        <Link href="/registration" legacyBehavior>
          <a className="nav-item bg-yellow-400 text-black p-2.5 rounded hover:bg-blue-400 hover:text-white transform hover:scale-110 transition-all duration-500">REGISTRATION</a>
        </Link>
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsParkingHovered(true)}
          onMouseLeave={() => setIsParkingHovered(false)}
        >
          <a href="#parking" className="nav-item bg-yellow-400 text-black p-2.5 rounded">PARKING</a>
          {isParkingHovered && (
            <div className="absolute left-0 top-full mt-0.2 bg-blue-500 rounded shadow-lg z-50 border border-blue-700">
              <Link href="/bosman" legacyBehavior>
                <a className="block px-4 py-2 text-white text-sm hover:bg-blue-700 hover:text-white border-b border-blue-700">BOSMAN</a>
              </Link>
              <Link href="/scc" legacyBehavior>
                <a className="block px-4 py-2 text-white text-sm hover:bg-blue-700 hover:text-white border-b border-blue-700">SCC</a>
              </Link> 
              <Link href="/bbi" legacyBehavior> 
                <a className="block px-4 py-2 text-white text-sm hover:bg-blue-700 hover:text-white">BBI</a>
              </Link> 
            </div>
          )}
        </div>
        <Link href="/profile" legacyBehavior>
          <a className="nav-item bg-yellow-400 text-black p-2.5 rounded hover:bg-blue-400 hover:text-white transform hover:scale-110 transition-all duration-500">PROFILE</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// LegacyBehavior is used to prevent the page from refreshing when the user clicks on a link.