import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';


export default function Register() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      // console.log(name, email, password)
     const request = await post('/api/auth/register', {name, email, password})
     //console.log(request)
     const response = request.data

    // console.log(response)
     if (request.status === 200) {
         navigate('/')
      toast.success("Registered Successfully")
      dispatch(SetUser(response.user))
    }
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      >
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="input-group">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-pink-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
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
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/landing/login"
                className="text-indigo-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
  
  
}
