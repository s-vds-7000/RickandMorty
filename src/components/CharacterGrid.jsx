// CharacterGrid.js (Updated with search functionality)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField } from '@mui/material';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Search by name"
        variant="outlined"
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={3}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Species: {character.species}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Gender: {character.gender}
                </Typography>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharacterGrid;


