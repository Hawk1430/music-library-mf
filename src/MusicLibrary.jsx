import React, { useState, useMemo } from 'react'
import { initialMusicData } from './data/musicData'
import MusicFilters from './components/MusicFilters'
import MusicList from './components/MusicList.jsx'
import AddSongModal from './components/AddSongModal'
import { Plus } from 'lucide-react'
import './index.css'

const MusicLibrary = ({ userRole = 'user' }) => {
  const [songs, setSongs] = useState(initialMusicData)
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    artist: '',
    album: ''
  })
  const [sortBy, setSortBy] = useState('title')
  const [sortOrder, setSortOrder] = useState('asc')
  const [groupBy, setGroupBy] = useState('none')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const isAdmin = userRole === 'admin'

  // Filter and sort songs using map, filter, reduce
  const processedSongs = useMemo(() => {
    let filtered = songs.filter(song => {
      const matchesSearch = !filters.search || 
        song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
        song.album.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesGenre = !filters.genre || song.genre === filters.genre
      const matchesArtist = !filters.artist || song.artist === filters.artist
      const matchesAlbum = !filters.album || song.album === filters.album

      return matchesSearch && matchesGenre && matchesArtist && matchesAlbum
    })

    // Sort songs
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'year') {
        aValue = parseInt(aValue)
        bValue = parseInt(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    // Group songs if needed
    if (groupBy !== 'none') {
      return filtered.reduce((groups, song) => {
        const key = song[groupBy]
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(song)
        return groups
      }, {})
    }

    return filtered
  }, [songs, filters, sortBy, sortOrder, groupBy])

  // Get unique values for filter dropdowns using map and reduce
  const filterOptions = useMemo(() => {
    return songs.reduce((acc, song) => {
      acc.genres.add(song.genre)
      acc.artists.add(song.artist)
      acc.albums.add(song.album)
      return acc
    }, {
      genres: new Set(),
      artists: new Set(),
      albums: new Set()
    })
  }, [songs])

  const handleAddSong = (newSong) => {
    const song = {
      ...newSong,
      id: Math.max(...songs.map(s => s.id)) + 1
    }
    setSongs(prev => [...prev, song])
    setIsAddModalOpen(false)
  }

  const handleDeleteSong = (songId) => {
    setSongs(prev => prev.filter(song => song.id !== songId))
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (field, order) => {
    setSortBy(field)
    setSortOrder(order)
  }

  const handleGroupChange = (groupField) => {
    setGroupBy(groupField)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Music Library</h2>
            <p className="text-gray-600 mt-1">
              {Array.isArray(processedSongs) 
                ? `${processedSongs.length} songs` 
                : `${Object.values(processedSongs).flat().length} songs in groups`
              }
            </p>
          </div>
          
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Song
            </button>
          )}
        </div>

        <MusicFilters
          filters={filters}
          filterOptions={filterOptions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          groupBy={groupBy}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onGroupChange={handleGroupChange}
        />
      </div>

      <MusicList
        songs={processedSongs}
        groupBy={groupBy}
        isAdmin={isAdmin}
        onDeleteSong={handleDeleteSong}
      />

      {isAddModalOpen && (
        <AddSongModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSong}
        />
      )}
    </div>
  )
}

export default MusicLibrary