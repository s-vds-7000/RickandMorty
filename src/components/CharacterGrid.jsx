import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const CharacterGrid = () => {
  // Hold the characters and their filters in state
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    location: '',
    episode: '',
    gender: '',
    species: '',
    type: ''
  });

  // Fetch characters based on filters using Axios
  useEffect(() => {
    // Convert filters to query params
    const params = new URLSearchParams(filters);

    // Fetch characters from the API
    axios
      .get(`https://rickandmortyapi.com/api/character/?${params}`)
      .then(response => {
        setCharacters(response.data.results); // Set characters based on API response
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, [filters]);

  // Handle changes in the filters
  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      {/* Top section with title and search bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="20px 0"
        borderBottom="1px solid #ccc"
        height="30px"
        
      >
        <Typography
          variant="h5"
          component="h1"
          style={{ color: '#3f51b5', fontFamily: 'Arial, sans-serif' }}
        >
          Rick And Morty
        </Typography>
        {/* Search bar */}
        <TextField
          label="Search..."
          variant="outlined"
          onChange={event =>
            setFilters({ ...filters, name: event.target.value })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Filters and action buttons */}
      <form>
        <Box display="flex" alignItems="center">
          {/* Button to navigate to locations */}
          <Button
            component={Link}
            to="/locations"
            variant="outlined"
            style={{ marginRight: '10px' }}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Locations
          </Button>
          
          {/* Status filter */}
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth sx={{ marginY: '15px' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Alive">Alive</MenuItem>
                  <MenuItem value="Dead">Dead</MenuItem>
                  <MenuItem value="unknown">Unknown</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          {/* Button to navigate to episodes */}
          <Button
            component={Link}
            to="/episodes"
            variant="outlined"
            style={{ marginLeft: '10px' }}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            Episodes
          </Button>
        </Box>
      </form>

      {/* Grid to display characters */}
      <Grid container spacing={3}>
        {characters.map(character => (
          <Grid item xs={12} sm={6} md={3} key={character.id}>
            {/* Card for each character */}
            <Card>
              {/* Display character image */}
              <img
                src={character.image}
                alt={character.name}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'contain'
                }}
              />
              {/* Character details */}
              <CardContent>
                <Typography
                  variant="h5"
                  component="h1"
                  textAlign="center"
                  fontSize="bold"
                >
                  {character.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  textAlign="center"
                >
                  Species: {character.species}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  textAlign="center"
                >
                  Gender: {character.gender}
                </Typography>
                {/* Button to view character profile */}
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
                        backgroundColor: '#303f9f'
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
