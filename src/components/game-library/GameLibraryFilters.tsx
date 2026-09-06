'use client';

import { GameCategory, GameFilter } from '@/types/game';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES: { value: GameCategory; label: string }[] = [
  { value: 'action', label: '⚔️ Action' },
  { value: 'adventure', label: '🗺️ Adventure' },
  { value: 'puzzle', label: '🧩 Puzzle' },
  { value: 'racing', label: '🏎️ Racing' },
  { value: 'strategy', label: '♟️ Strategy' },
  { value: 'rpg', label: '🧙 RPG' },
  { value: 'shooter', label: '🔫 Shooter' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'casual', label: '🎮 Casual' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: '🔥 Popular' },
  { value: 'trending', label: '📈 Trending' },
  { value: 'newest', label: '🆕 New' },
  { value: 'highest-rated', label: '⭐ Highest Rated' },
  { value: 'most-played', label: '👥 Most Played' },
];

interface GameLibraryFiltersProps {
  onFilterChange: (filters: GameFilter) => void;
  loading?: boolean;
}

export default function GameLibraryFilters({
  onFilterChange,
  loading = false,
}: GameLibraryFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | undefined>();
  const [selectedSort, setSelectedSort] = useState<GameFilter['sort']>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearch(value);
    onFilterChange({
      search: value,
      category: selectedCategory,
      sort: selectedSort,
      page: 1,
    });
  };

  const handleCategoryChange = (category: GameCategory | undefined) => {
    setSelectedCategory(category);
    onFilterChange({
      search,
      category,
      sort: selectedSort,
      page: 1,
    });
  };

  const handleSortChange = (sort: GameFilter['sort']) => {
    setSelectedSort(sort);
    onFilterChange({
      search,
      category: selectedCategory,
      sort,
      page: 1,
    });
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 md:p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search games, creators, tags..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
        />
      </div>

      {/* Filter Toggle (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 transition-colors"
      >
        <Filter size={18} />
        <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
      </button>

      {/* Filters Container */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
          !showFilters && 'max-md:hidden'
        }`}
      >
        {/* Sort */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Sort By</h3>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value as GameFilter['sort'])}
                disabled={loading}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedSort === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                } disabled:opacity-50`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(undefined)}
              disabled={loading}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedCategory === undefined
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              } disabled:opacity-50`}
            >
              All Games
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                disabled={loading}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                } disabled:opacity-50`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
