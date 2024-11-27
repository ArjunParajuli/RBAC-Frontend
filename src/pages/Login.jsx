import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const user = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const request = await post('/api/auth/login', { email, password });
      const response = request.data;
      

      if (request.status === 200) {
        navigate('/');
        toast.success("Logged in Successfully");
        dispatch(SetUser(response.user));
      }
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    // console.log('Google Login Success:', response);
    try {
      // console.log(response.credential)
      const request = await post('/api/auth/google-login', {
        token: response.credential, // Send the Google token to your server
      });
      const serverResponse = request.data;
      // console.log(serverResponse)

      if (request.status === 200) {
        navigate('/');
        toast.success("Logged in Successfully");
        dispatch(SetUser(serverResponse.user));
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      toast.error('Google login failed');
    }
  };

  const handleGoogleLoginError = () => {
    toast.error('Google login failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="input-group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          {/* Password Input */}
          <div className="input-group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-pink-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
  
          {/* Register Link */}
          <p className="text-sm text-center text-gray-600">
            Not registered?{" "}
            <Link to="/landing/register" className="text-pink-500 hover:underline">
              Register here
            </Link>
          </p>
        </form>
  
        {/* Google Login */}
        <div className="mt-6">
          <GoogleLogin
            onSuccess={(response) => handleGoogleLoginSuccess(response)}
            onError={handleGoogleLoginError}
            className="w-full flex items-center justify-center py-2 border rounded-md hover:shadow-md transition duration-200"
          />
        </div>
      </div>
    </div>
  );
  
}
