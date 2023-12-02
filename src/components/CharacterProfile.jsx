// CharacterProfile.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CharacterProfile() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        setCharacter(response.data);
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
      });
  }, [id]);

  return (
    <div>
      {character && (
        <div>
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          {/* Display other character details */}
        </div>
      )}
    </div>
  );
}

export default CharacterProfile;
