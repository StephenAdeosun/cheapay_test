import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic form validation
    if (!email.trim() || !password.trim() || !firstName.trim() || !lastName.trim() || !phoneNumber.trim()) {
      setError('Please fill in all the fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      // Simulate an API call to create a new user
      const response = await fetch('YOUR_USER_REGISTRATION_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // User creation successful, redirect to login page or handle accordingly
        console.log('User created successfully!');
      } else {
        // User creation failed, display error message
        setError(data.message || 'User creation failed.');
      }
    } catch (error) {
      console.error('Error during user creation:', error.message);
      setError('An error occurred during user creation.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setError('');
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setError('');
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setError('');
  };

  const isValidEmail = (email) => {
    // Basic email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Basic phone number validation regex pattern
    const phoneNumberPattern = /^[0-9]{11}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  setTimeout(() => {
    setShowPassword(false);
  }, 200); // Hide the password after 1 second (adjust as needed)

  // ... (same form validation and submission logic as before)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
           
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>


          <div className="relative mb-4">
        
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full  px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={password}
            onChange={handlePasswordChange}
          />
             <button
          type="button"
          className="absolute right-2 -mt-5 transform -translate-y-1/2 flex items-center justify-center"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="w-4 h-6 text-gray-500 cursor-pointer"
          />
        </button>
        </div>

       
          <div className="mb-4"> 
           
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
          
            <input
              id="lastName"
              type="text"
              placeholder="Last Name(optional)"
              value={lastName}
              onChange={handleLastNameChange}
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
        
            <input
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number(Digits only)"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account? 
        </p>
      </div>
    </div>
  );
}

export default Signup;

