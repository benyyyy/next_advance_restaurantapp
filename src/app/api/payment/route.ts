import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Set CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: Request) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return NextResponse.json({}, { headers: corsHeaders });
  }
  try {
    const { cartItems } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert INR to paisa
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // UPI is handled through "card"
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL}/cart`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
