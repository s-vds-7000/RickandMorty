// EpisodeGrid.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function EpisodeGrid() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  }, []);

  return (
    <div>
      {episodes.map(episode => (
        <div key={episode.id}>
          <h2>{episode.name}</h2>
          <p>Episode: {episode.episode}</p>
          {/* Display other episode information as needed */}
        </div>
      ))}
    </div>
  );
}

export default EpisodeGrid;
