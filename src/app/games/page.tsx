'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/game-library/GameCard';
import GameLibraryFilters from '@/components/game-library/GameLibraryFilters';
import { Game, GameFilter } from '@/types/game';
import { useRouter } from 'next/navigation';

// Mock data for demo - replace with actual API calls
const MOCK_GAMES: Game[] = [
  {
    id: 'zing-runner',
    owner_id: 'user-1',
    title: '🎮 Zing Runner',
    description: 'Run fast, avoid obstacles, and reach the finish line. A classic endless runner game.',
    thumbnail: 'https://images.unsplash.com/photo-1538481143235-5d81cbed6a7d?w=400&h=300&fit=crop',
    category: 'casual',
    tags: ['runner', 'fast-paced', 'casual'],
    visibility: 'public',
    published: true,
    featured: true,
    play_count: 15420,
    rating: 4.5,
    created_at: '2026-08-15T10:00:00Z',
    updated_at: '2026-09-05T14:30:00Z',
    owner: { username: 'GameCreator1', avatar_url: 'https://i.pravatar.cc/150?img=1' },
  },
  {
    id: 'zombie-night',
    owner_id: 'user-2',
    title: '🧟 Zombie Night',
    description: 'Survive the zombie apocalypse. Fight hordes of undead creatures in this action-packed game.',
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop',
    category: 'action',
    tags: ['zombie', 'survival', 'action'],
    visibility: 'public',
    published: true,
    featured: true,
    play_count: 28540,
    rating: 4.7,
    created_at: '2026-07-20T09:15:00Z',
    updated_at: '2026-09-04T11:20:00Z',
    owner: { username: 'ZombieCreator', avatar_url: 'https://i.pravatar.cc/150?img=2' },
  },
  {
    id: 'speed-racing',
    owner_id: 'user-3',
    title: '🏎️ Speed Racing',
    description: 'Race against AI opponents on stunning tracks. Unlock new cars and prove your racing skills.',
    thumbnail: 'https://images.unsplash.com/photo-1491863834786-3bfd7d5d28a7?w=400&h=300&fit=crop',
    category: 'racing',
    tags: ['racing', 'cars', 'multiplayer'],
    visibility: 'public',
    published: true,
    featured: false,
    play_count: 19230,
    rating: 4.3,
    created_at: '2026-08-01T16:45:00Z',
    updated_at: '2026-09-03T08:10:00Z',
    owner: { username: 'RaceKing', avatar_url: 'https://i.pravatar.cc/150?img=3' },
  },
  {
    id: 'puzzle-world',
    owner_id: 'user-4',
    title: '🧩 Puzzle World',
    description: 'Solve challenging puzzles and unlock brain-teasing levels. A perfect game for puzzle lovers.',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    category: 'puzzle',
    tags: ['puzzle', 'brain', 'educational'],
    visibility: 'public',
    published: true,
    featured: false,
    play_count: 12850,
    rating: 4.6,
    created_at: '2026-08-10T12:00:00Z',
    updated_at: '2026-09-02T15:25:00Z',
    owner: { username: 'PuzzleMaster', avatar_url: 'https://i.pravatar.cc/150?img=4' },
  },
  {
    id: 'space-adventure',
    owner_id: 'user-5',
    title: '🌌 Space Adventure',
    description: 'Explore the vast galaxy, discover new planets, and complete exciting space missions.',
    thumbnail: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
    category: 'adventure',
    tags: ['space', 'exploration', 'adventure'],
    visibility: 'public',
    published: true,
    featured: true,
    play_count: 21340,
    rating: 4.4,
    created_at: '2026-07-25T14:30:00Z',
    updated_at: '2026-09-01T10:45:00Z',
    owner: { username: 'SpaceExplorer', avatar_url: 'https://i.pravatar.cc/150?img=5' },
  },
  {
    id: 'dungeon-crawler',
    owner_id: 'user-6',
    title: '🗡️ Dungeon Crawler',
    description: 'Delve into dark dungeons, battle fearsome creatures, and collect legendary treasures.',
    thumbnail: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    category: 'rpg',
    tags: ['rpg', 'dungeon', 'fantasy'],
    visibility: 'public',
    published: true,
    featured: false,
    play_count: 16780,
    rating: 4.5,
    created_at: '2026-08-05T11:20:00Z',
    updated_at: '2026-09-01T17:30:00Z',
    owner: { username: 'DungeonMaster', avatar_url: 'https://i.pravatar.cc/150?img=6' },
  },
  {
    id: 'tower-defense',
    owner_id: 'user-7',
    title: '🛡️ Tower Defense',
    description: 'Defend your kingdom from waves of enemies. Strategy and quick thinking required!',
    thumbnail: 'https://images.unsplash.com/photo-1535936647527-de8f2d3c2cc6?w=400&h=300&fit=crop',
    category: 'strategy',
    tags: ['strategy', 'tower-defense', 'tactical'],
    visibility: 'public',
    published: true,
    featured: false,
    play_count: 14320,
    rating: 4.2,
    created_at: '2026-08-12T09:50:00Z',
    updated_at: '2026-08-31T13:15:00Z',
    owner: { username: 'StrategyGamer', avatar_url: 'https://i.pravatar.cc/150?img=7' },
  },
  {
    id: 'basketball-star',
    owner_id: 'user-8',
    title: '🏀 Basketball Star',
    description: 'Become a basketball superstar. Shoot, score, and win championship games.',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68711109d298?w=400&h=300&fit=crop',
    category: 'sports',
    tags: ['sports', 'basketball', 'arcade'],
    visibility: 'public',
    published: true,
    featured: false,
    play_count: 11560,
    rating: 4.1,
    created_at: '2026-08-18T15:35:00Z',
    updated_at: '2026-08-30T12:50:00Z',
    owner: { username: 'SportsLover', avatar_url: 'https://i.pravatar.cc/150?img=8' },
  },
];

export default function GamesPage() {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>(MOCK_GAMES);
  const [filteredGames, setFilteredGames] = useState<Game[]>(MOCK_GAMES);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<GameFilter>({ sort: 'popular' });

  // Simulate API call with filters
  const handleFilterChange = (newFilters: GameFilter) => {
    setFilters(newFilters);
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      let result = [...games];

      // Apply search filter
      if (newFilters.search) {
        const searchLower = newFilters.search.toLowerCase();
        result = result.filter(
          (game) =>
            game.title.toLowerCase().includes(searchLower) ||
            game.description.toLowerCase().includes(searchLower) ||
            game.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      // Apply category filter
      if (newFilters.category) {
        result = result.filter((game) => game.category === newFilters.category);
      }

      // Apply sorting
      switch (newFilters.sort) {
        case 'trending':
          result.sort((a, b) => b.play_count - a.play_count);
          break;
        case 'newest':
          result.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          break;
        case 'highest-rated':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'most-played':
          result.sort((a, b) => b.play_count - a.play_count);
          break;
        case 'popular':
        default:
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
      }

      setFilteredGames(result);
      setLoading(false);
    }, 300);
  };

  const handlePlayGame = (gameId: string) => {
    router.push(`/play/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-white">🎮 Game Library</h1>
          <p className="text-gray-400 mt-2">
            Explore {games.length} amazing games created by our community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <GameLibraryFilters onFilterChange={handleFilterChange} loading={loading} />

        {/* Results Count */}
        <div className="mt-6 text-sm text-gray-400">
          Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={handlePlayGame}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No games found</h2>
            <p className="text-gray-400">
              Try adjusting your search filters or browse all games
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-900 rounded-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-white mt-4 text-center">Loading games...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
