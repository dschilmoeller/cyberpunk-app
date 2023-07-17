// to be non-static, editable character sheet
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

// RENAME THIS DRAMATICALLY TO DISTINGUISH FROM IN PLAY SHEET
function CharacterDetail() {
    const characterDetail = useSelector((store) => store.characterDetail);
    // console.log(`Characters:`, characterList);
    const [heading, setHeading] = useState('Character Sheet - ADVANCEMENT/EDITING');
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    let charName = characterDetail[0].name

    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        console.log(`Charname`, charName);
    }

    return (
        <>
            <div>
                <h2>{heading}</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => fetchCharacterDetail()}>Fetch Character Details</Button>
                <Button onClick={() => dispatch({ type: 'CLEAR_CHARACTER_DETAIL' })}>Clear Details</Button>
                {charName ? <p>Character Detail: {charName}</p> : <></>}

            </div>
        </>
    )
}

export default CharacterDetail;
