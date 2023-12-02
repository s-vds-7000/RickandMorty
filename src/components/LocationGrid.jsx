// LocationGrid.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function LocationGrid() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/location')
      .then(response => {
        setLocations(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  return (
    <div>
      {locations.map(location => (
        <div key={location.id}>
          <h2>{location.name}</h2>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          {/* Display other location information as needed */}
        </div>
      ))}
    </div>
  );
}

export default LocationGrid;
