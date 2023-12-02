import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const CharacterProfile = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(characterResponse.data);

        const originResponse = await axios.get(characterResponse.data.origin.url);
        setOrigin(originResponse.data);

        const locationResponse = await axios.get(characterResponse.data.location.url);
        setLocation(locationResponse.data);

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
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              {character.name}
            </Typography>
            <img
              src={character.image}
              alt={character.name}
              style={{ maxHeight: '200px', maxWidth: '100%', marginBottom: '12px' }}
            />
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
            {episodes.map((episode, index) => (
              <Typography variant="body2" color="textSecondary" component="p" key={index}>
                {episode}
              </Typography>
            ))}
            {/* Display origin and location details */}
            <Typography variant="h6" component="h3">
              Origin:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Name: {origin.name}
            </Typography>
            {/* Display other origin details */}
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
          </CardContent>
        </Card>
      )}
      {error && (
        <Typography variant="body2" color="error" component="p">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default CharacterProfile;

