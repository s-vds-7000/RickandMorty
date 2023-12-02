// LocationGrid.js (Updated for individual character display per location)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const LocationGrid = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [charactersByLocation, setCharactersByLocation] = useState({});

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/location')
      .then(response => {
        setLocations(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    axios.get(`https://rickandmortyapi.com/api/location/?name=${searchTerm}`)
      .then(response => {
        setLocations(response.data.results);
      })
      .catch(error => {
        console.error('Error searching location:', error);
      });
  };

  const handleShowCharacters = (location) => {
    const residentIds = location.residents.map(resident => resident.split('/').pop());
    axios.all(residentIds.map(residentId => axios.get(`https://rickandmortyapi.com/api/character/${residentId}`)))
      .then(responses => {
        const residentData = responses.map(response => response.data);
        setCharactersByLocation({ ...charactersByLocation, [location.id]: residentData });
      })
      .catch(error => {
        console.error('Error fetching characters for location:', error);
      });
  };

  const resetCharacters = () => {
    setCharactersByLocation({});
  };

  return (
    <div>
      <TextField
        label="Search by Location Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleSearchSubmit();
          }
        }}
      />
      <Grid container spacing={3}>
        {locations.map(location => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Type: {location.type}
                </Typography>
                <Button variant="contained" onClick={() => handleShowCharacters(location)}>
                  Show Characters
                </Button>
                {/* Display characters related to the location */}
                {charactersByLocation[location.id] && (
                  <div>
                    <Typography variant="h6" component="h3">
                      Characters in this Location:
                    </Typography>
                    {charactersByLocation[location.id].map((character, index) => (
                      <Typography variant="body2" color="textSecondary" component="p" key={index}>
                        {character.name}
                      </Typography>
                    ))}
                    <Button variant="outlined" onClick={resetCharacters}>
                      Hide Characters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LocationGrid;
