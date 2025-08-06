import Link from "next/link";

export default function ServerErrorPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4">500</div>
        <h1 className="text-4xl font-bold text-gray-700 mb-4">Server Error</h1>
        <p className="text-xl text-gray-600 mb-8">
          Something went wrong on our end. Please try again later.
        </p>
        <div className="space-x-4">
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-block bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}