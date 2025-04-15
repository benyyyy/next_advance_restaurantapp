'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '../../context/CartContext/page'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <nav className="bg-purple-400 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-lg font-bold text-gray-800">
            RestaurantApp
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthPage && (
              <>
                {/* For Normal User */}
                {!isAdmin && (
                  <>
                    <Link href="/" className="text-gray-800 hover:text-green-500 font-semibold">
                      Home
                    </Link>
                    <Link href="/menu" className="text-gray-800 hover:text-green-500 font-semibold">
                      Menu
                    </Link>
                    <Link href="/about" className="text-gray-800 hover:text-green-500 font-semibold">
                      About
                    </Link>
                    <Link href="/contact" className="text-gray-800 hover:text-green-500 font-semibold">
                      Contact
                    </Link>
                    <Link href="/cart" className="text-gray-800 hover:text-green-500 font-semibold">
                      🛒 Cart ({totalItems})
                    </Link>
                    <Link 
                      href="/suggestions" 
                      className="text-gray-800 hover:text-green-500 font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/suggestions');
                      }}
                    >
                      Suggestions
                    </Link>
                  </>
                )}

                {/* For Admin Only */}
                {isAdmin && (
                  <>
                    <Link 
                      href="/admin/suggestions" 
                      className="text-gray-800 hover:text-red-600 font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/admin/suggestions');
                      }}
                    >
                      View Suggestions
                    </Link>
                    <Link href="/admin" className="text-gray-800 hover:text-red-600 font-semibold">
                      Admin Dashboard
                    </Link>
                  </>
                )}

                {user && (
                  <span className="text-gray-800 font-semibold">
                    👤 {isAdmin ? `Admin: ${displayName}` : `User: ${displayName}`}
                  </span>
                )}

                <button
                  onClick={logout}
                  className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {/* Show login/signup if not authenticated */}
            {isAuthPage && (
              <>
                <Link href="/login" className="text-gray-800 hover:text-green-500 font-semibold">
                  Login
                </Link>
                <Link href="/signup" className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 font-semibold">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            {!isAuthPage && (
              <>
                {/* Normal User */}
                {!isAdmin && (
                  <>
                    <Link href="/" className="text-gray-800 hover:text-green-500 font-semibold">
                      Home
                    </Link>
                    <Link href="/menu" className="text-gray-800 hover:text-green-500 font-semibold">
                      Menu
                    </Link>
                    <Link href="/about" className="text-gray-800 hover:text-green-500 font-semibold">
                      About
                    </Link>
                    <Link href="/contact" className="text-gray-800 hover:text-green-500 font-semibold">
                      Contact
                    </Link>
                    <Link href="/cart" className="text-gray-800 hover:text-green-500 font-semibold">
                      🛒 Cart ({totalItems})
                    </Link>
                    <Link 
                      href="/suggestions" 
                      className="text-gray-800 hover:text-green-500 font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/suggestions');
                      }}
                    >
                      Suggestions
                    </Link>
                  </>
                )}

                {/* Admin User */}
                {isAdmin && (
                  <>
                    <Link 
                      href="/admin/suggestions" 
                      className="text-gray-800 hover:text-red-600 font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push('/admin/suggestions');
                      }}
                    >
                      View Suggestions
                    </Link>
                    <Link href="/admin" className="text-gray-800 hover:text-red-600 font-semibold">
                      Admin Dashboard
                    </Link>
                  </>
                )}

                {user && (
                  <span className="text-gray-800 font-semibold">
                    👤 {isAdmin ? `Admin: ${displayName}` : `User: ${displayName}`}
                  </span>
                )}

                <button
                  onClick={logout}
                  className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 w-fit"
                >
                  Logout
                </button>
              </>
            )}

            {isAuthPage && (
              <>
                <Link href="/login" className="text-gray-800 hover:text-green-500 font-semibold">
                  Login
                </Link>
                <Link href="/signup" className="text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700 font-semibold">
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
