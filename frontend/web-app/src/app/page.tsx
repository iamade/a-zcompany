import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 mt-32">
      <div className="flex flex-col items-center py-16 justify-center mt-20 rounded-2xl shadow-xl relative">
        <Image
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
          src="/images/hero1.jpg"
          alt="ski resort image"
          fill
          priority
          unoptimized
        />
        <div className="flex flex-col p-8 rounded-2xl items-center relative z-10">
          <h1 className="my-6 font-extrabold text-white text-6xl">
            Welcome to A-ZCompany!
          </h1>
          <Link
            href="/shop"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-2xl text-white rounded-2xl px-8 py-4 border-2 border-transparent mt-8 hover:opacity-90 transition-opacity"
          >
            Go to shop
          </Link>
        </div>
      </div>
    </div>
  );
}
