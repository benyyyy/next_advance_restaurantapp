export default function CancelPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
        <h1 className="text-3xl font-bold text-red-700">Payment Canceled ❌</h1>
        <p className="mt-4 text-lg">Your payment was not completed.</p>
        <a href="/cart" className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg">
          Go to Cart
        </a>
      </div>
    );
  }
  