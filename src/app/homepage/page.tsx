export default function HomePage() {
    return (
      <div className="relative bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
            Welcome to Contriverz Restaurant 
          </h1>
          <p className="mt-6 text-xl max-w-3xl mx-auto text-gray-200">
            Discover the finest dining experience with our exquisite menu crafted by world-class chefs.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition duration-300 shadow-lg md:py-4 md:text-lg md:px-10">
              View Menu
            </button>
            <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300 shadow-lg md:py-4 md:text-lg md:px-10">
              Book a Table
            </button>
          </div>
        </div>
      </div>
    );
  }
  