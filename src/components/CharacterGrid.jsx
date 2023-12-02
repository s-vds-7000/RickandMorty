import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    episode: '',
    gender: '',
    species: '',
    type: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(filters);
    axios.get(`https://rickandmortyapi.com/api/character/?${params}`)
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <form>
        <TextField
          label="Search by name"
          variant="outlined"
          onChange={(event) => setFilters({ ...filters, name: event.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={filters.status} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Alive">Alive</MenuItem>
            <MenuItem value="Dead">Dead</MenuItem>
            <MenuItem value="unknown">Unknown</MenuItem>
          </Select>
        </FormControl>
        {/* Other filter options for location, episode, gender, species, type */}
      </form>
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
                {/* Additional information can be displayed */}
                <Link to={`/character/${character.id}`}>View Profile</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharacterGrid;



