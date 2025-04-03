"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import menuData from "@/data/foodmenu.json";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
};

const categories = ["All", "Indian", "Chinese", "Arabic", "Japanese", "Italian", "Desserts", "Mixed"];
const subcategories = ["All", "Main Course", "Snacks", "Starter", "Cakes", "Variety"];

export default function MenuPage() {
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    let filtered = [...menuData];
    
    // Filter by category tab
    if (activeTab !== "All") {
      filtered = filtered.filter((item) => item.category === activeTab);
    }
    
    // Filter by subcategory
    if (selectedSubcategory !== "All") {
      filtered = filtered.filter((item) => item.subcategory === selectedSubcategory);
    }
    
    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
    setFilteredMenu(filtered);
  }, [activeTab, selectedSubcategory, searchQuery]);

  const handleCategoryClick = (category: string) => {
    setActiveTab(category);
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Delicious Menu</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Explore our wide variety of dishes from different cuisines
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search dishes..."
              className="w-full p-4 pl-12 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap transition-colors ${
                  activeTab === category
                    ? "bg-orange-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subcategory Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type:
            </label>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSubcategory === subcategory
                      ? "bg-orange-600 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedSubcategory(subcategory)}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {filteredMenu.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-600">
              No items found matching your criteria
            </h2>
            <button
              className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              onClick={() => {
                setActiveTab("All");
                setSelectedSubcategory("All");
                setSearchQuery("");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {activeTab === "All" ? "All Dishes" : `${activeTab} Cuisine`}
              {selectedSubcategory !== "All" && ` - ${selectedSubcategory}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        ₹{item.price}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                        {item.category}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {item.subcategory}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}