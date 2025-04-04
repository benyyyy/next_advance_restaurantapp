"use client";

import { useCart } from "@/context/CartContext/page";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!stripePublicKey) {
    throw new Error("STRIPE_PUBLISHABLE_KEY is not defined in the environment variables.");
  }
  
  const stripePromise = loadStripe(stripePublicKey);
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    
    const stripe = await stripePromise;
  
    if (!stripe) {
      console.error("Stripe failed to initialize.");
      setLoading(false);
      return;
    }

    console.log("Cart items being sent to payment API:", cart);
    console.log("Total Price:", totalPrice);

    const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });
  
    const session = await response.json();
  
    if (session.error) {
      console.error(session.error);
      setLoading(false);
      return;
    }
  
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
  
    if (result.error) {
      console.error(result.error.message);
    }
  
    setLoading(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>₹{item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                  className="px-2"
                >
                  ➖
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">➕</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">❌</button>
            </div>
          ))}

          <div className="mt-4 p-4 border-t text-lg font-semibold">
            <p>Total Bill: ₹{totalPrice.toFixed(2)}</p>
          </div>

          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
