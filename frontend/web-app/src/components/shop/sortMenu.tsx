"use client";

import { useEffect, useRef } from "react";

interface SortMenuProps {
  currentSort: string;
  onSort: (sort: string) => void;
  onClose: () => void;
}

const sortOptions = [
  { name: "Alphabetical", value: "name" },
  { name: "Price: Low to High", value: "priceAsc" },
  { name: "Price: High to Low", value: "priceDesc" },
];

export function SortMenu({ currentSort, onSort, onClose }: SortMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
      ref={menuRef}
    >
      {sortOptions.map((option) => (
        <button
          key={option.value}
          className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
            currentSort === option.value ? "bg-blue-50 text-blue-600" : ""
          }`}
          onClick={() => onSort(option.value)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
