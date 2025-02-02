"use client";

import React, { useState } from 'react';

const RegistrationMain: React.FC = () => {
  const [formData, setFormData] = useState({ // Define the initial state of the form data
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    appName: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Handle input changes
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: any = {}; // Validate the form data
    if (!formData.fullName.includes(' ')) {
      newErrors.fullName = 'Please enter both first and last names.';
    }
    if (!/^\+?[0-9]{10,15}$/.test(formData.phoneNumber)) { // Validate the phone number
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { 
      newErrors.email = 'Please enter a valid email address.';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5004/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json(); // Handle the form submission
          console.log('Form submitted:', data);
          alert('Registration Successful!');
          setFormData({
            fullName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            appName: '',
          });
          setErrors({
            fullName: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
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
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-gray-600 font-medium">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-600 font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange} // Handle the form submission
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

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
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationMain;