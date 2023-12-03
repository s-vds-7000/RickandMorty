import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for UI elements
const StyledCard = styled(Card)({
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: '20px',
  padding: '0 50px',
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '10px',
  '&:hover': {
    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
  },
});

const CenteredContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const EpisodeBox = styled(Box)({
  backgroundColor: '#757575',
  color: '#fff',
  padding: '8px 12px',
  borderRadius: '4px',
  margin: '4px',
  display: 'inline-block',
});

const ImageWithBorder = styled('img')({
  maxHeight: '200px',
  maxWidth: '100%',
  marginBottom: '12px',
  border: '2px solid #ccc', // Add border to the image
  borderRadius: '8px', // Add border-radius for rounded corners
});

const CharacterProfile = () => {
  const { id } = useParams();
  // State variables for character details
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch character details when the ID changes
    const fetchCharacterDetails = async () => {
      try {
        // Fetch character information
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(characterResponse.data);

        // Fetch origin information
        const originResponse = await axios.get(characterResponse.data.origin.url);
        setOrigin(originResponse.data);

        // Fetch location information
        const locationResponse = await axios.get(characterResponse.data.location.url);
        setLocation(locationResponse.data);

        // Fetch episodes information
        const episodesResponse = await Promise.all(characterResponse.data.episode.map(episodeUrl =>
          axios.get(episodeUrl)
        ));
        const episodeNames = episodesResponse.map(episode => episode.data.name);
        setEpisodes(episodeNames);
      } catch (error) {
        setError('Error fetching character details');
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  return (
    <div>
      {character && origin && location && (
        <StyledCard>
          <CardContent>
            <CenteredContent>
              {/* Display character name */}
              <Typography variant="h3" component="h1" style={{ color: '#3f51b5', fontFamily: 'Arial, sans-serif' }}>
                {character.name}
              </Typography>

              {/* Display character image */}
              <ImageWithBorder
                src={character.image}
                alt={character.name}
              />

              {/* Display character details */}
              <Typography variant="body2" color="textSecondary" component="p">
                Species: {character.species}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Gender: {character.gender}
              </Typography>

              {/* Display episode names */}
              <Typography variant="h6" component="h3">
                Episodes:
              </Typography>
              <Box>
                {episodes.map((episode, index) => (
                  <EpisodeBox key={index}>{episode}</EpisodeBox>
                ))}
              </Box>

              {/* Display origin and location details */}
              <Typography variant="h6" component="h3">
                Origin:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Name: {origin.name}
              </Typography>

              {/* Display location details */}
              <Typography variant="h6" component="h3">
                Location:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Name: {location.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Dimension: {location.dimension}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Residents: {location.residents.length}
              </Typography>
            </CenteredContent>
          </CardContent>
        </StyledCard>
      )}

      {/* Display error message if there's an error */}
      {error && (
        <Typography variant="body2" color="error" component="p">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default CharacterProfile;
