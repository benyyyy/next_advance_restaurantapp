export default function SuccessPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
        <h1 className="text-3xl font-bold text-green-700">Payment Successful 🎉</h1>
        <p className="mt-4 text-lg">Thank you for your purchase!</p>
        <a href="/" className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg">
          Go to Home
        </a>
      </div>
    );
  }
  