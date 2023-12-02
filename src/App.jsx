import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import CharacterGrid from './components/CharacterGrid';
import CharacterProfile from './components/CharacterProfile';
import LocationGrid from './components/LocationGrid';
import EpisodeGrid from './components/EpisodeGrid';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterGrid/>} />
        <Route path="/character/:id" element={<CharacterProfile/>} />
        <Route path="/locations" element={<LocationGrid/>} />
        <Route path="/episodes" element={<EpisodeGrid/>} />
        {/* Add routes for search and filters */}
      </Routes>
    </Router>
  );
}


export default App;
