import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';


function CharacterList() {
  const characterList = useSelector((store) => store.characterList);
  // console.log(`Characters:`, characterList);
  const [heading, setHeading] = useState('Functional Component');
  const dispatch = useDispatch();

  const fetchCharacters = () => {
    dispatch({type: "FETCH_ALL_CHARACTERS"})
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
        <div key={character.id}>{character.name}</div>
        )})}
      </>) : <></>}
    </div>
  );
}

export default CharacterList;
