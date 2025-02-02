"use client"; // Client side component, necessary for the code to work in the browser

import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import Image from 'next/image'; // Optimize image loading with the next/image component

const BbiMain: React.FC = () => { // Define components: reservations, messages, prices, logged in users
  const [reservation, setReservation] = useState({ date: '', fromTime: '', toTime: '' });
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState<{ appName: string } | null>(null);
  const hourlyRate = 2.5; // Define the hourly rate for parking

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser'); // Retrieve the logged in user from local storage
    if (user) {
      setLoggedInUser(JSON.parse(user)); // Parse JSON data into JS object
    }
  }, []);

  const handleReserve = async () => { // Handle the reservation process
    const { date, fromTime, toTime } = reservation;

    if (!loggedInUser) { // Check if the user is logged in
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

    // Validate the date, check if the selected date is today or in the future
    if (date < today) {
      setMessage('Please select a valid date (today or in the future).');
      setPrice(0);
      return;
    }

    // Validate full hours, like 12:00, 13:00, 14:00, etc
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
    setMessage(`Reservation successful! Total cost: ${totalCost.toFixed(2)} BAM`); // Two decimal places

    // Send reservation details to the backend
    try {
      const response = await fetch('http://localhost:5004/reserve', { // Fetch the reservation endpoint
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appName: loggedInUser.appName, date, fromTime, toTime }), // Convert data to JSON
      });

      if (response.ok) { // Check if the response is successful
        const data = await response.json();
        console.log('Reservation saved:', data); // Log the reservation data
      } else {
        const errorData = await response.json();
        setMessage(`Reservation failed: ${errorData.message}`); // Display the error message
      }
    } catch (error) {
      console.error('Error:', error); // Error during fetch
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 animate-fade-in">
      {/* Left Column */}
      <div>
        <h1 className="text-5xl font-bold mb-4 text-blue-700 transition-transform hover:scale-105 duration-300">
          Welcome to BBI Parking
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Secure garage parking at the heart of the city.
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
          href="https://www.google.com/maps/place/Aria/@43.8583333,18.4141525,17z/data=!3m2!4b1!5s0x4758c8da8a3cac0d:0x7fd8d3fae0ca2e2b!4m6!3m5!1s0x4758c8da8bbba1b3:0xf7fc906f8e2fc83e!8m2!3d43.8583333!4d18.4167274!16s%2Fm%2F0g5b2v2?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer" // Security benefits and prevents the new page from accessing the window.opener property
          className="text-blue-600 hover:underline"
        >
          View Location on Google Maps
        </a>
      </div>

      {/* Right Column */}
      <div>
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Reserve Your Parking Spot</h2>
        <div className="space-y-4">
          <input // Date input field with full width, padding, border, rounded corners, and focus styles
            type="date" // Date input type
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" // Focus ring color
            onChange={(e) => setReservation({ ...reservation, date: e.target.value })} // Update the date value
          />
          <div className="flex space-x-4">
            <input
              type="time"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setReservation({ ...reservation, fromTime: e.target.value })} // Update the fromTime value
            />
            <input
              type="time"
              className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setReservation({ ...reservation, toTime: e.target.value })} // Update the toTime value
            />
          </div>
          <button
            onClick={handleReserve} // Handle the reservation process
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Reserve Now
          </button>
        </div>
        {message && ( // Check if success or error message exists
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
            src="/images/bbiparking.jpg"
            alt="BBI Parking"
            width={600}
            height={400}
            className="rounded shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BbiMain;