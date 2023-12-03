import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const EpisodesGrid = () => {
  // State variables
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [charactersByEpisode, setCharactersByEpisode] = useState({});

  // Fetch episodes on component mount
  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    axios.get(`https://rickandmortyapi.com/api/episode/?name=${searchTerm}`)
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error searching episodes:', error);
      });
  };

  // Fetch characters for a specific episode
  const handleShowCharacters = (episode) => {
    const characterIds = episode.characters.map(character => character.split('/').pop());
    axios.all(characterIds.map(characterId => axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)))
      .then(responses => {
        const characterData = responses.map(response => response.data);
        setCharactersByEpisode({ ...charactersByEpisode, [episode.id]: characterData });
      })
      .catch(error => {
        console.error('Error fetching characters for episode:', error);
      });
  };

  // Reset characters displayed for episodes
  const resetCharacters = () => {
    setCharactersByEpisode({});
  };

  // Render characters with styled boxes
  const renderCharacters = (characters) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {characters.map((character, index) => (
          <Box
            key={index}
            bgcolor="#757575"
            color="#fff"
            padding="8px 12px"
            borderRadius="4px"
            margin="4px"
          >
            {character.name}
          </Box>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="h2" align="center" style={{ margin: '20px 0' }}>
        Episodes
      </Typography>

      {/* Search bar */}
      <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px">
        <TextField
          label="Search by Episode Name"
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

      {/* Episodes grid */}
      <Grid container spacing={3}>
        {episodes.map(episode => (
          <Grid item xs={12} sm={6} md={4} key={episode.id}>
            <Card>
              <CardContent>
                {/* Episode details */}
                <Typography variant="h5" component="h2" textAlign="center">
                  {episode.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" textAlign="center">
                  Episode: {episode.episode}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" textAlign="center">
                  Air Date: {episode.air_date}
                </Typography>

                {/* Button to show characters */}
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                  <Button variant="contained" onClick={() => handleShowCharacters(episode)}>
                    Show Characters
                  </Button>
                </Box>

                {/* Display characters related to the episode */}
                {charactersByEpisode[episode.id] && (
                  <div>
                    <Typography variant="h6" component="h3">
                      Characters in this Episode:
                    </Typography>
                    {renderCharacters(charactersByEpisode[episode.id])}
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

export default EpisodesGrid;
