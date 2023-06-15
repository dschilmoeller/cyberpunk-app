// to be static-ish char sheet, used during play
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

function CharacterSheet() {
    const characterList = useSelector((store) => store.characterList);
    // console.log(`Characters:`, characterList);
    const [heading, setHeading] = useState('Character Sheet - IN PLAY');
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
    }

    return (
        <>
            <div>
                <h2>{heading}</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => fetchCharacterDetail()}>Fetch Character Details</Button>
                <p>Character Sheet</p>

            </div>
        </>
    )
}

export default CharacterSheet;
