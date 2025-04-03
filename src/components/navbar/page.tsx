"use client"
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-purple-400 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-700 text-lg">RestaurantApp</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="py-4 px-2 text-primary-dark hover:text-green-400  border-b-4 border-primary-dark font-semibold">
                Home
              </Link>
              <Link href="/menu" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-400  transition duration-300">
                Menu
              </Link>
              <Link href="/about" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-400  transition duration-300">
                About
              </Link>
              <Link href="/contact" className="py-4 px-2 text-gray-700 font-semibold hover:text-green-400  transition duration-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login" className="py-2 px-2 font-medium text-gray-700 rounded hover:bg-primary hover:text-green-400 transition duration-300">
              Log In
            </Link>
            <Link href="/register" className="py-2 px-2 font-medium text-white bg-primary rounded hover:bg-primary-dark transition duration-300">
              Sign Up
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-700 hover:text-primary-dark"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block px-3 py-2 text-base font-medium text-white bg-primary-dark rounded">
            Home
          </Link>
          <Link href="/menu" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary hover:text-white rounded">
            Menu
          </Link>
          <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary hover:text-white rounded">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary hover:text-white rounded">
            Contact
          </Link>
          <div className="pt-4 pb-2 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-2">
              <Link href="/login" className="w-full px-3 py-2 text-center font-medium text-primary-dark bg-white border border-primary-dark rounded-md hover:bg-green-400">
                Log In
              </Link>
              <Link href="/register" className="w-full px-3 py-2 text-center font-medium text-white bg-primary-dark rounded-md hover:bg-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}