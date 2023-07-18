import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

function CharacterList() {
  const characterList = useSelector((store) => store.characterList);
  
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_CHARACTERS" })
  }, [])

  const moveToCharacterSheet = (id) => {
    history.push(`/charactersheet/${id}`)
  }
  const moveToAdvancementSheet = (id) => {
    history.push(`/advancementsheet/${id}`)
  }

  return (
    <div>
      <h2>Character List</h2>
      {characterList.length ? (
        <>
          <p>My Characters:</p>
          {characterList.map((character) => {
            return (
              <div key={character.id}>
                <Button variant='contained' sx={{ m: 1 }} onClick={() => moveToCharacterSheet(character.id)}>{character.handle}</Button>
                <Button onClick={() => moveToAdvancementSheet(character.id)}>Spend XP Version </Button>
              </div>
            )
          })}
        </>) : <></>}
    </div>
  );
}

export default CharacterList;
