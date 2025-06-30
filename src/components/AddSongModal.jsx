import React, { useState } from 'react'
import { X, Plus } from 'lucide-react'

const AddSongModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    year: new Date().getFullYear()
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(formData)
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add New Song</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Song Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter song title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Artist *
            </label>
            <input
              type="text"
              name="artist"
              required
              value={formData.artist}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter artist name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Album *
            </label>
            <input
              type="text"
              name="album"
              required
              value={formData.album}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter album name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre *
              </label>
              <input
                type="text"
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Rock"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <input
                type="number"
                name="year"
                required
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 3:45"
              pattern="[0-9]+:[0-9]{2}"
            />
            <p className="text-xs text-gray-500 mt-1">Format: MM:SS (e.g., 3:45)</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSongModal
