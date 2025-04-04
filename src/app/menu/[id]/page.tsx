"use client";

import { useCart } from "@/context/CartContext/page";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import menuData from "@/data/foodmenu.json";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  image: string;
  description: string;
};

export default function FoodDetailsPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const foodId = params.id ? parseInt(params.id as string, 10) : null;
  const foodItem = menuData.find((item) => item.id === foodId);

  if (!foodItem) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Food item not found</h1>
        <Link href="/menu">
          <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded">
            Go Back to Menu
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image src={foodItem.image} alt={foodItem.name} width={500} height={350} className="rounded-xl" />
      <h1 className="text-3xl font-bold mt-4">{foodItem.name}</h1>
      <p className="text-xl font-semibold mt-4">Price: ₹{foodItem.price}</p>
    
      
      <div className="mt-6 flex space-x-4">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded shadow"
          onClick={() => addToCart({ ...foodItem, quantity: 1 })}
        >
          Add to Cart
        </button>
        <Link href="/menu">
          <button className="px-6 py-3 bg-gray-500 text-white rounded">
            Back to Menu
          </button>
        </Link>
      </div>
    </div>
  );
}
