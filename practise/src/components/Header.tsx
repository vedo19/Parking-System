"use client";

import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<{ appName: string } | null>(null);

  useEffect(() => { // useEffect hook to retrieve the logged-in user from localStorage when the component mounts
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Remove the logged-in user from localStorage
    setLoggedInUser(null); // Set the logged-in user to null
    window.location.reload(); // Reload to update the header
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-5 bg-blue-400 text-white w-full h-56">
      <div className="logo flex-1">
        <img src="/images/platz_logo.png" alt="Platz Logo" className="w-52 h-auto transition-opacity duration-1000" />
      </div>
      <div className="title-box flex-2 text-center bg-customPurple p-7 rounded-lg">
        <h1 className="text-4xl text-white m-0">PLATZ</h1>
      </div>
      <div className="contact-info flex-1 flex flex-col md:flex-row justify-end gap-2 items-center">
        <a href="mailto:infoPlatz@parking.com" className="text-black bg-yellow-400 p-2.5 rounded hover:bg-customPurple hover:text-white transition-colors duration-500">Email</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black bg-yellow-400 p-2.5 rounded hover:bg-customPurple hover:text-white transition-colors duration-500">Instagram</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-black bg-yellow-400 p-2.5 rounded hover:bg-customPurple hover:text-white transition-colors duration-500">Facebook</a>
        {loggedInUser ? (
          <div className="flex flex-col items-center space-y-2 mt-2 md:mt-0"> {/* User initial in a circular container with background color, text color, and centered text */}
            <span className="text-white">Welcome, {loggedInUser.appName}</span>
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {loggedInUser.appName.charAt(0).toUpperCase()}
            </div>
            <button // Logout button with background color, text color, padding, rounded corners, and hover effect
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="bg-customPurple text-white px-4 py-2 rounded transition-colors duration-500 mt-2 md:mt-0">
            Not logged in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;


