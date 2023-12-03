import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

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


  // API call using axios library
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


  // function to filter grid items
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px 0"
      borderBottom="1px solid #ccc"
      height="30px"
    >
      <Typography variant="h5" component="h1" style={{ color: '#3f51b5', fontFamily: 'Arial, sans-serif' }}>
        Rick And Morty
      </Typography>
      <TextField
        label="Search..."
        variant="outlined"
        onChange={(event) => setFilters({ ...filters, name: event.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
      <form>
      <Box display="flex" alignItems="center">
      <Button
            component={Link}
            to="/locations"
            variant="outlined"
            style={{ marginRight: '10px' }}
            sx={{ display: { xs: 'none', sm: 'flex' } }} // Hide on xs (extra small) screens
          >
            Locations
          </Button>
        <Grid container justifyContent="center"> {/* Centering the Status FormControl */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth sx={{ marginY: '15px' }}>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={filters.status} onChange={handleFilterChange} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Alive">Alive</MenuItem>
                <MenuItem value="Dead">Dead</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
            component={Link}
            to="/episodes"
            variant="outlined"
            style={{ marginLeft: '10px' }}
            sx={{ display: { xs: 'none', sm: 'flex' } }} // Hide on xs (extra small) screens
          >
            Episodes
          </Button>
          </Box>
      </form>
      <Grid container spacing={3}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={3} key={character.id}>
            <Card>
              {/* Display character image */}
              <img
                src={character.image}
                alt={character.name}
                style={{ width: '100%', height: '300px', objectFit: 'contain' }}
              />
              <CardContent>
                <Typography variant="h5" component="h1" textAlign="center" fontSize="bold">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" textAlign="center">
                  Species: {character.species}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" textAlign="center">
                  Gender: {character.gender}
                </Typography>
                {/* Additional information can be displayed */}
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/character/${character.id}`}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: '#3f51b5',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#303f9f',
                      },
                      alignContent: 'center'
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharacterGrid;
