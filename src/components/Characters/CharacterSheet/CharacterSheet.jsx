// to be static-ish char sheet, used during play
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import CharacterAttributes from './CharacterAttributes';
import CharacterSkills from './CharacterSkills';
import CharacterMarkers from './CharacterMarkers';

// only load when chardetail is loaded

function CharacterSheet() {
    const charDetail = useSelector((store) => store.characterDetail[0]);
    // console.log(`Characters:`, characterList);
    const [heading, setHeading] = useState('Character Sheet - IN PLAY');
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <h2>{heading}</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => fetchCharacterDetail()}>Fetch Character Details</Button>
                <p>Character Sheet</p>

                <Grid container spacing={2}>

                    {charDetail ? (
                        <>
                            <Grid item xs={4}>
                                <Item>Name: {charDetail.name}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Role: {charDetail.role}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {charDetail.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Culture: {charDetail.culture}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Concept: {charDetail.concept}</Item>
                            </Grid>
                            <CharacterAttributes charDetail={charDetail} />
                            <CharacterSkills charDetail={charDetail} />
                            <CharacterMarkers charDetail={charDetail} />

                        </>
                    ) : <></>}
                </Grid>
            </Box>
        </>
    )
}

export default CharacterSheet;
