// EpisodesGrid.js (Updated for individual character display per episode)
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const EpisodesGrid = () => {
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [charactersByEpisode, setCharactersByEpisode] = useState({});

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    axios.get(`https://rickandmortyapi.com/api/episode/?name=${searchTerm}`)
      .then(response => {
        setEpisodes(response.data.results);
      })
      .catch(error => {
        console.error('Error searching episodes:', error);
      });
  };

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

  const resetCharacters = () => {
    setCharactersByEpisode({});
  };

  return (
    <div>
      <TextField
        label="Search by Episode Name"
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
        {episodes.map(episode => (
          <Grid item xs={12} sm={6} md={4} key={episode.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {episode.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Episode: {episode.episode}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Air Date: {episode.air_date}
                </Typography>
                <Button variant="contained" onClick={() => handleShowCharacters(episode)}>
                  Show Characters
                </Button>
                {/* Display characters related to the episode */}
                {charactersByEpisode[episode.id] && (
                  <div>
                    <Typography variant="h6" component="h3">
                      Characters in this Episode:
                    </Typography>
                    {charactersByEpisode[episode.id].map((character, index) => (
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

export default EpisodesGrid;
