import React from "react";
import MusicLibrary from "./MusicLibrary";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <MusicLibrary userRole="user" />
    </div>
  );
}

export default App;
