# Music Library MF - Remote Micro Frontend

A micro frontend application that provides music library management functionality. This application is designed to be loaded dynamically by the main host application using Module Federation.

## 🏗️ Architecture Role

This application is the **remote application** in the micro frontend architecture:

- **Music Management**: Provides song browsing, filtering, and management features
- **Role-Based UI**: Adapts interface based on user permissions (admin vs user)
- **Module Federation Remote**: Exposes the MusicLibrary component for dynamic loading
- **Standalone Capability**: Can run independently for development and testing

## 🚀 How to Run Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🔐 Role-Based Features

### Admin Role Features

When accessed with admin privileges, users can:

- **Add Songs**: Create new songs with full metadata
- **Delete Songs**: Remove songs from the library
- **Full Management**: Complete control over the music library

### User Role Features

When accessed with user privileges, users can:

- **Browse Songs**: View all songs in the library
- **Search & Filter**: Find songs by title, artist, album, or genre
- **Sort & Group**: Organize songs by various criteria
- **Read-Only Access**: No modification capabilities

## 🚀 Deployment to Netlify

### Current Deployment

The application is currently deployed on **Netlify**:

- **Live URL**: `https://stellar-sawine-73d5eb.netlify.app`
- **Remote Entry**: Available at `/remoteEntry.js`
- **Repository**: `https://github.com/Hawk1430/music-library-mf`

- **HOST APP Live URL**: `https://vocal-speculoos-d47519.netlify.app/`
- **HOST APP Repository**: `https://github.com/Hawk1430/music-library-main-app`

### Deployment Configuration

**Build Settings:**

- Build Command: `npm run build`
- Publish Directory: `dist`
- Node Version: 18 (or latest LTS)

**Environment Variables:**

- No environment variables required for this demo

### Manual Deployment

If you need to deploy manually:

1. **Install Netlify CLI**:

   ```bash
   npm install -g netlify-cli
   ```

2. **Build the application**:

   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=dist
   ```

## 🔧 Technical Details

### Module Federation Configuration

The application is configured as a **remote** in the Module Federation setup:

```javascript
federation({
  name: "music-library-mf",
  filename: "remoteEntry.js",
  exposes: {
    "./MusicLibrary": "./src/MusicLibrary",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});
```

### Key Components

- **MusicLibrary**: Main component exposed to the host application
- **MusicFilters**: Search and filter functionality
- **MusicList**: Song display and management
- **AddSongModal**: Admin interface for adding new songs

### Data Management

- **Sample Data**: Includes 10 classic songs for demonstration
- **State Management**: Uses React useState for local state
- **Data Processing**: Implements filtering, sorting, and grouping with useMemo

### Dependencies

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Module Federation**: Micro frontend architecture
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## 📁 Project Structure

```
music-library-mf/
├── src/
│   ├── components/
│   │   ├── MusicFilters.jsx     # Search and filter controls
│   │   ├── MusicList.jsx        # Song display component
│   │   └── AddSongModal.jsx     # Add song form
│   ├── data/
│   │   └── musicData.js         # Sample music data
│   ├── MusicLibrary.jsx         # Main component (exposed)
│   ├── App.jsx                  # Standalone app wrapper
│   └── index.css                # Global styles
├── vite.config.js               # Vite and Module Federation config
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎵 Sample Music Data

The application includes 10 classic songs for demonstration:

1. Bohemian Rhapsody - Queen
2. Hotel California - Eagles
3. Billie Jean - Michael Jackson
4. Like a Rolling Stone - Bob Dylan
5. Sweet Child O' Mine - Guns N' Roses
6. Imagine - John Lennon
7. Stairway to Heaven - Led Zeppelin
8. Smells Like Teen Spirit - Nirvana
9. Purple Haze - Jimi Hendrix
10. What's Going On - Marvin Gaye

## 🔍 Troubleshooting

### Common Issues

1. **Module Federation Issues**

   - Ensure the remote entry file is accessible
   - Check CORS settings in vite.config.js
   - Verify the exposed component path

2. **Build Issues**

   - Ensure all dependencies are installed
   - Check Node.js version compatibility
   - Clear node_modules and reinstall if needed

3. **Development Issues**
   - Make sure the host application is running
   - Check browser console for loading errors
   - Verify the remote entry URL in host configuration

### Development Tips

1. **Standalone Development**: The app can run independently for testing
2. **Hot Reload**: Changes are reflected immediately during development
3. **Component Testing**: Test the MusicLibrary component in isolation

## 🔗 Related

- [Music Library MF](https://github.com/Hawk1430/music-library-mf/blob/main/README.md) - The remote micro frontend
- [Main Project README](https://github.com/Hawk1430/music-library-main-app?tab=readme-ov-file) - Overall project documentation
