"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import menuData from "@/data/foodmenu.json";
import { useCart } from "@/context/CartContext/page";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
};

type Language = "en" | "hi";

const translations: Record<Language, Record<string, string | Record<string, string>>> = {
  en: {
    menuTitle: "Our Delicious Menu",
    searchPlaceholder: "Search dishes...",
    categoryLabel: "Filter by Type:",
    allDishes: "All Dishes",
    cuisine: "Cuisine",
    resetFilters: "Reset Filters",
    noItems: "No items found matching your criteria",
    addToCart: "Add to Cart",
    language: "Language",
    viewDetails: "View Details",
    categories: {
      all: "All",
      indian: "Indian",
      chinese: "Chinese",
      arabic: "Arabic",
      japanese: "Japanese",
      italian: "Italian",
      desserts: "Desserts",
      mixed: "Mixed",
    },
  },
  hi: {
    menuTitle: "हमारा स्वादिष्ट मेनू",
    searchPlaceholder: "व्यंजन खोजें...",
    categoryLabel: "प्रकार के अनुसार फ़िल्टर करें:",
    allDishes: "सभी व्यंजन",
    cuisine: "व्यंजन",
    resetFilters: "फ़िल्टर रीसेट करें",
    noItems: "कोई आइटम नहीं मिला जो आपके मानदंडों से मेल खाता हो",
    addToCart: "कार्ट में जोड़ें",
    language: "भाषा",
    viewDetails: "विवरण देखें",
    categories: {
      all: "सभी",
      indian: "भारतीय",
      chinese: "चीनी",
      arabic: "अरबी",
      japanese: "जापानी",
      italian: "इटालियन",
      desserts: "मिठाइयाँ",
      mixed: "मिश्रित",
    },
  },
};

const categories = ["All", "Indian", "Chinese", "Arabic", "Japanese", "Italian", "Desserts", "Mixed"];

export default function MenuPage() {
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menuData);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [language, setLanguage] = useState<Language>("en");
  const { addToCart } = useCart();

  useEffect(() => {
    let filtered = menuData.filter((item) =>
      searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    );

    if (activeTab !== "All") {
      filtered = filtered.filter((item) => item.category === activeTab);
    }

    setFilteredMenu(filtered);
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 to-red-600 py-4 px-6 text-white">
        <h1 className="text-3xl font-bold">{translations[language]?.menuTitle as string}</h1>
        <button
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="px-4 py-2 bg-white text-orange-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          {translations[language]?.language as string}: {language === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={translations[language]?.searchPlaceholder as string}
            className="w-full p-4 pl-12 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap transition-colors ${
                activeTab === category ? "bg-orange-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {translations[language].categories?.[category.toLowerCase() as keyof typeof translations["en"]["categories"]] as string ?? category}
            </button>
          ))}
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium text-gray-600">{translations[language]?.noItems as string}</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenu.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <Image src={item.image} alt={item.name} width={200} height={150} className="object-cover w-full h-40 rounded-t-xl" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-lg font-semibold">₹{item.price}</p>
                  <button
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className="mt-2 w-full bg-green-600 text-white py-2 rounded"
                  >
                    {translations[language]?.addToCart as string}
                  </button>
                  <Link href={`/menu/${item.id}`}>
                    <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded">
                      {translations[language]?.viewDetails as string}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}