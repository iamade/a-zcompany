import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors font-medium"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
