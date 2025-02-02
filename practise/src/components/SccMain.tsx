"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SccMain: React.FC = () => {
  const [reservation, setReservation] = useState({ date: '', fromTime: '', toTime: '' });
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<{ appName: string } | null>(null);
  const hourlyRate = 2.5;

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleReserve = async () => {
    const { date, fromTime, toTime } = reservation;

    if (!loggedInUser) {
      setMessage('Please log in to reserve a parking spot.');
      return;
    }

    // Ensure all fields are filled
    if (!date || !fromTime || !toTime) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];

    // Validate the date
    if (date < today) {
      setMessage('Please select a valid date (today or in the future).');
      setPrice(0);
      return;
    }

    // Validate full hours
    const fromHour = parseInt(fromTime.split(':')[0], 10);
    const toHour = parseInt(toTime.split(':')[0], 10);
    const minutesStart = parseInt(fromTime.split(':')[1], 10);
    const minutesEnd = parseInt(toTime.split(':')[1], 10);

    if (minutesStart !== 0 || minutesEnd !== 0) {
      setMessage('Please enter full hours (e.g., 12:00, 13:00).');
      setPrice(0);
      return;
    }

    // Calculate duration
    const duration = toHour - fromHour;
    if (duration <= 0) {
      setMessage('Invalid time range. Please check the "From" and "To" times.');
      setPrice(0);
      return;
    }

    // Calculate total cost
    const totalCost = duration * hourlyRate;
    setPrice(totalCost);
    setMessage(`Reservation successful! Total cost: ${totalCost.toFixed(2)} BAM`);

    // Send reservation details to the backend
    try {
      const response = await fetch('http://localhost:5004/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appName: loggedInUser.appName, date, fromTime, toTime }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Reservation saved:', data);
      } else {
        const errorData = await response.json();
        setMessage(`Reservation failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 animate-fade-in">
      {/* Left Column */}
      <div>
        <h1 className="text-5xl font-bold mb-4 text-blue-700 transition-transform hover:scale-105 duration-300">
          Welcome to SCC Parking
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Secure garage parking at city center with easy access.
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
          <li>24/7 Security</li>
          <li>Electrical cars charging stations</li>
          <li>Easy Access</li>
          <li>Garage implementation</li>
        </ul>
        <p className="text-lg font-semibold mb-4 text-gray-800">
          Hourly Rate: <span className="text-blue-700 font-bold">2.50 BAM</span>
        </p>
        <a
          href="https://www.google.com/maps/place/SCC+-+Sarajevo+City+Center/@43.8553997,18.40554,17z/data=!3m1!4b1!4m6!3m5!1s0x4758c8df25ac110b:0xb1cd13f8b38c755a!8m2!3d43.8553997!4d18.4081149!16s%2Fm%2F0b75y43?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Location on Google Maps
        </a>
      </div>

      {/* Right Column */}
      <div>
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Reserve Your Parking Spot</h2>
        <div className="space-y-4">
          <input
            type="date"
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
          />
          <div className="flex space-x-4">
            <input
              type="time"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setReservation({ ...reservation, fromTime: e.target.value })}
            />
            <input
              type="time"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setReservation({ ...reservation, toTime: e.target.value })}
            />
          </div>
          <button
            onClick={handleReserve}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Reserve Now
          </button>
        </div>
        {message && (
          <div
            className={`mt-4 p-3 border rounded ${
              message.startsWith('Reservation successful!')
                ? 'bg-green-100 text-green-700 border-green-300'
                : 'bg-red-100 text-red-700 border-red-300'
            }`}
          >
            {message}
          </div>
        )}
        <div className="mt-10">
          <Image
            src="/images/sccparking.jpeg"
            alt="SCC Parking"
            width={600}
            height={400}
            className="rounded shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default SccMain;

