"use client";

import React, { useState } from 'react';

const ProfileMain: React.FC = () => {
  const [formData, setFormData] = useState({
    appName: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    appName: '',
    password: '',
  });

  // Function to handle input changes and update form data state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => { // Validate the form data
    const newErrors: any = {};
    if (!formData.appName) {
      newErrors.appName = 'Please enter your App Name.';
    }
    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => { // Handle the form submission
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5004/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          alert(data.message);
          localStorage.setItem('loggedInUser', JSON.stringify({ appName: formData.appName }));
          window.location.reload(); // Reload to update the header
        } else {
          const errorData = await response.json();
          alert(errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="appName" className="block text-gray-600 font-medium">App Name</label>
          <input
            type="text"
            id="appName"
            name="appName"
            value={formData.appName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.appName && <p className="text-red-500 text-sm mt-1">{errors.appName}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 transform hover:scale-105"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default ProfileMain;