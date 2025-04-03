import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaYelp } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-DEFAULT text-red-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RestaurantApp</h3>
            <p className="text-gray-3">
              Bringing you the finest dining experience with quality ingredients and exceptional service.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-900 hover:text-green-300 transition">Home</Link></li>
              <li><Link href="/menu" className="text-gray-900 hover:text-green-300 transition">Menu</Link></li>
              <li><Link href="/about" className="text-gray-900 hover:text-green-300 transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-900 hover:text-green-300 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-gray-900 not-italic">
              123 Restaurant Street<br />
              Foodville, FC 12345<br />
              <br />
              Phone: (123) 456-7890<br />
              Email: info@restaurantapp.com
            </address>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="http://facebook.com/" className="text-gray-900 hover:text-green-300 transition text-2xl">
                <FaFacebook />
              </Link>
              <Link href="http://twitter.com/" className="text-gray-900 hover:text-green-300 transition text-2xl">
                <FaTwitter />
              </Link>
              <Link href="http://instagram.com/" className="text-gray-900 hover:text-green-300 transition text-2xl">
                <FaInstagram />
              </Link>
              <Link href="http://yelp.com/" className="text-gray-900 hover:text-green-300 transition text-2xl">
                <FaYelp />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-900 text-sm">
          <p>&copy; {currentYear} RestaurantApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}