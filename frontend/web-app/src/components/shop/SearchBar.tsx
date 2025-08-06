"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onSearch: (search: string) => void;
}

export function SearchBar({ value, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-md mx-4"
    >
      <input
        type="search"
        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-2 flex items-center pl-3 hover:text-blue-500 transition-colors"
      >
        <Search size={20} className="text-gray-500" />
      </button>
    </form>
  );
}
