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
    dispatch({type: "CLEAR_ADVANCEMENT_DETAIL"})
  }, [])

  const moveToCharacterSheet = (id) => {
    history.push(`/charactersheet/${id}`)
  }
  const moveToAdvancementSheet = (id) => {
    history.push(`/advancementsheet/${id}`)
  }

  const moveToShopSheet = (id) => {
    history.push(`/shopSheet/${id}`)
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
                <Button onClick={() => moveToAdvancementSheet(character.id)}>Spend XP & Equip Gear </Button>
                <Button onClick={() => moveToShopSheet(character.id)}>Shopping </Button>
              </div>
            )
          })}
        </>) : <></>}
    </div>
  );
}

export default CharacterList;
