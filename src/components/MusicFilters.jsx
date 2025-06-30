import React from 'react'
import { Search, Filter, ArrowUpDown, Group } from 'lucide-react'

const MusicFilters = ({
  filters,
  filterOptions,
  sortBy,
  sortOrder,
  groupBy,
  onFilterChange,
  onSortChange,
  onGroupChange
}) => {
  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search songs, artists, or albums..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Filter className="inline h-4 w-4 mr-1" />
            Genre
          </label>
          <select
            value={filters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {Array.from(filterOptions.genres).map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Artist Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist
          </label>
          <select
            value={filters.artist}
            onChange={(e) => handleFilterChange('artist', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Artists</option>
            {Array.from(filterOptions.artists).map(artist => (
              <option key={artist} value={artist}>{artist}</option>
            ))}
          </select>
        </div>

        {/* Album Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Album
          </label>
          <select
            value={filters.album}
            onChange={(e) => handleFilterChange('album', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Albums</option>
            {Array.from(filterOptions.albums).map(album => (
              <option key={album} value={album}>{album}</option>
            ))}
          </select>
        </div>

        {/* Group By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Group className="inline h-4 w-4 mr-1" />
            Group By
          </label>
          <select
            value={groupBy}
            onChange={(e) => onGroupChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="none">No Grouping</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="genre">Genre</option>
          </select>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center text-sm font-medium text-gray-700">
          <ArrowUpDown className="h-4 w-4 mr-1" />
          Sort by:
        </span>
        {['title', 'artist', 'album', 'year'].map(field => (
          <button
            key={field}
            onClick={() => onSortChange(field, sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              sortBy === field
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
            }`}
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
            {sortBy === field && (
              <span className="ml-1">
                {sortOrder === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MusicFilters