import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
      <Typography variant="h3" align="center" gutterBottom>
        Locations
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
        <TextField
          label="Search by Location Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <Button variant="contained" onClick={handleSearchSubmit}>
                <SearchIcon />
              </Button>
            ),
          }}
        />
        
      </Box>
      <Grid container spacing={3}>
        {locations.map(location => (
          <Grid item xs={12} sm={6} md={4} key={location.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" textAlign="center">
                  {location.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" textAlign="center">
                  Type: {location.type}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Button variant="contained" onClick={() => handleShowCharacters(location)}>
                  Show Characters
                </Button>
                </Box>
                {/* Display characters related to the location */}
                {charactersByLocation[location.id] && (
  <div>
    <Typography variant="h6" component="h3">
      Characters in this Location:
    </Typography>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {charactersByLocation[location.id].map((character, index) => (
        <div
          key={index}
          style={{
            background: '#757575',
            padding: '8px 12px',
            borderRadius: '5px',
            color: 'white',
          }}
        >
          {character.name}
        </div>
      ))}
    </div>
    <Button variant="outlined" onClick={resetCharacters} sx={{ m: '8px'}}>
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
