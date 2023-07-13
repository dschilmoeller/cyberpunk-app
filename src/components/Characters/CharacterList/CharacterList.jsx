import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function CharacterList() {
  const characterList = useSelector((store) => store.characterList);
  // console.log(`Characters:`, characterList);
  const [heading, setHeading] = useState('Functional Component');
  const dispatch = useDispatch();
  const history = useHistory()

  const fetchCharacters = () => {
    dispatch({ type: "FETCH_ALL_CHARACTERS" })
  }

  const moveToCharacterSheet = (id) => {
    history.push(`/charactersheet/${id}`)
  }
  const moveToCharacterDetail = (id) => {
    history.push(`/characterdetail/${id}`)
  }


  return (
    <div>
      <h2>{heading}</h2>
      <Button onClick={() => fetchCharacters()}>Get All Characters</Button>
      {characterList.length ? (
        <>
          <p>My Characters:</p>
          {characterList.map((character) => {
            return (
              <div key={character.id}>
                <Button variant='contained' sx={{ m: 1 }} onClick={() => moveToCharacterSheet(character.id)}>{character.handle}</Button>
                <Button onClick={() => moveToCharacterDetail(character.id)}>Spend XP Version </Button>
              </div>
            )
          })}
        </>) : <></>}
    </div>
  );
}

export default CharacterList;
