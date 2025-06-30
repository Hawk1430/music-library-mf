import React from 'react'
import { Trash2, Clock, Calendar, Music } from 'lucide-react'

const MusicList = ({ songs, groupBy, isAdmin, onDeleteSong }) => {
  if (groupBy !== 'none') {
    return (
      <div className="divide-y divide-gray-200">
        {Object.entries(songs).map(([group, groupSongs]) => (
          <div key={group} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Music className="h-5 w-5 mr-2 text-blue-600" />
              {group} ({groupSongs.length} songs)
            </h3>
            <div className="grid gap-3">
              {groupSongs.map(song => (
                <SongCard 
                  key={song.id} 
                  song={song} 
                  isAdmin={isAdmin} 
                  onDelete={onDeleteSong} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid gap-3">
        {songs.map(song => (
          <SongCard 
            key={song.id} 
            song={song} 
            isAdmin={isAdmin} 
            onDelete={onDeleteSong} 
          />
        ))}
      </div>
      
      {songs.length === 0 && (
        <div className="text-center py-12">
          <Music className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No songs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or search terms.
          </p>
        </div>
      )}
    </div>
  )
}

const SongCard = ({ song, isAdmin, onDelete }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 truncate">
                {song.title}
              </h4>
              <p className="text-gray-600 mt-1">
                by <span className="font-medium">{song.artist}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Album: {song.album}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 ml-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {song.year}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {song.duration}
              </div>
              <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {song.genre}
              </div>
            </div>
          </div>
        </div>
        
        {isAdmin && (
          <button
            onClick={() => onDelete(song.id)}
            className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-md transition-colors"
            title="Delete song"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default MusicList