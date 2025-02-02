"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./main.css"; // Custom CSS file for additional styles

const MainContent = () => {
  const [visibleNews, setVisibleNews] = useState([false, false, false]); // Not visible in the beginning
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/images/bosmanparking.jpg", alt: "BOSMAN", caption: "BOSMAN" },
    { src: "/images/sccparking.jpeg", alt: "SCC", caption: "SCC" },
    { src: "/images/bbiparking.jpg", alt: "BBI", caption: "BBI" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    const timers = [
      setTimeout(() => setVisibleNews([true, false, false]), 1000), // After 1 second
      setTimeout(() => setVisibleNews([true, true, false]), 2000), // After 2 seconds
      setTimeout(() => setVisibleNews([true, true, true]), 3000), // After 3 seconds
    ];

    return () => {
      clearInterval(interval);
      timers.forEach((timer) => clearTimeout(timer)); // Clear all timers after it is done
    };
  }, [images.length]);

  return (
    <div className="flex justify-between mt-[50px] px-20 mb-20">
      {/* Left Section - Latest News */}
      <div className="w-1/2 pr-5">
        <h2 className="text-2xl font-bold mb-5">Latest News</h2>
        {visibleNews[0] && (
          <div className="bg-customPurple text-white p-5 mb-5 rounded transition-all duration-500 hover:bg-blue-400 hover:text-white hover:scale-105 animate-fade-in">
            <span className="font-bold">News 1</span>
            <p>
              On 21.10.2024, we concluded a deal with the parking SCC. Our CEO,
              Vedad Kruho, mentioned it is a great pleasure to sign a contract
              with one of the most valuable and important private parking
              facilities in Sarajevo.
            </p>
          </div>
        )}
        {visibleNews[1] && (
          <div className="bg-customPurple text-white p-5 mb-5 rounded transition-all duration-500 hover:bg-blue-400 hover:text-white hover:scale-105 animate-fade-in">
            <span className="font-bold">News 2</span>
            <p>
              We are happy to announce that we extended a deal with the BOSMAN
              company till 2027. BOSMAN had the most successful year, and our
              team worked really hard to make this cooperation possible.
            </p>
          </div>
        )}
        {visibleNews[2] && (
          <div className="bg-customPurple text-white p-5 mb-5 rounded transition-all duration-500 hover:bg-blue-400 hover:text-white hover:scale-105 animate-fade-in">
            <span className="font-bold">News 3</span>
            <p>
              We are thrilled to announce that as we finish October, we have
              more than 20,000 happy customers using our web app for reserving
              and securing parking slots.
            </p>
          </div>
        )}
      </div>

      {/* Right Section - Slideshow */}
      <div className="w-1/2 pl-5">
        <h2 className="text-2xl font-bold mb-5">Our Parking Place</h2>
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={images[currentImageIndex].src} // Display the current image
            alt={images[currentImageIndex].alt} // Alt text for the image
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500"
          />
          <figcaption className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center py-2 font-bold text-lg hover:bg-opacity-80 hover:text-yellow-300 transition-all duration-300">
            {images[currentImageIndex].caption}
          </figcaption>
        </div>
      </div>
    </div>
  );
};

export default MainContent;

