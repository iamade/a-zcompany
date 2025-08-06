"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, ChevronDown, User, History, LogOut } from "lucide-react";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { useCartStore, useCartItemCount } from "@/src/stores/useCartStore";

export function Header() {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { currentUser, isAdmin, logout } = useAuthStore();
  const { getCart } = useCartStore();
  const itemCount = useCartItemCount();

  useEffect(() => {
    setMounted(true);
    getCart(); // Load cart when component mounts
  }, [getCart]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="shadow-md max-h-20 p-3 w-full fixed top-0 bg-white z-50">
      <div className="flex align-middle items-center justify-between max-w-screen-2xl mx-auto">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="app logo"
            width={64}
            height={64}
            className="max-h-16"
            unoptimized
          />
        </Link>

        <nav className="flex gap-3 my-2 uppercase text-2xl">
          <Link
            href="/"
            className={`hover:text-blue-500 transition-colors ${
              isActive("/") ? "active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className={`hover:text-blue-500 transition-colors ${
              isActive("/shop") ? "active" : ""
            }`}
          >
            Shop
          </Link>
          <Link
            href="/test-error"
            className={`hover:text-blue-500 transition-colors ${
              isActive("/test-error") ? "active" : ""
            }`}
          >
            Errors
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={`hover:text-blue-500 transition-colors ${
                isActive("/admin") ? "active" : ""
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex gap-3 align-middle">
          <Link
            href="/cart"
            className={`${
              itemCount > 0 ? "custom-badge" : ""
            } mt-2 mr-2 hover:text-blue-500 transition-colors ${
              isActive("/cart") ? "active" : ""
            }`}
            data-badge={mounted && itemCount > 0 ? itemCount.toString() : ""}
          >
            <ShoppingCart size={24} />
          </Link>

          {currentUser ? (
            <div className="relative px-6">
              <button
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <ChevronDown size={20} />
                <span>{currentUser.email}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <ShoppingCart size={16} />
                    My cart
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <History size={16} />
                    View Orders
                  </Link>
                  <hr className="my-1" />
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/account/login"
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/account/register"
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
