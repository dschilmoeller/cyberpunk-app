// to be static-ish char sheet, used during play
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';

import CharacterAttributes from './CharacterAttributes';
import CharacterSkills from './CharacterSkills';
import CharacterMarkers from './CharacterMarkers';
import CharacterSpecialSkills from './CharacterSpecialSkills';

function CharacterSheet() {
    const charDetail = useSelector((store) => store.characterDetail);
    const charStatus = useSelector(store => store.characterStatus)
    const charWeapons = useSelector((store) => store.characterWeapons)

    // console.log(`Characters:`, characterList);
    
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    useEffect(() => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
    }, [])

    const saveCharacter = () => {
        dispatch({type: "SAVE_CHARACTER_SHEET", payload: {charID: params.id, charParams: {charStatus:charStatus, charWeapons: charWeapons} }})
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <h2>Character Sheet - IN PLAY</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => saveCharacter()}>Save Current Status</Button>
                <p>Character Sheet</p>

                <Grid container spacing={1}>

                    {charDetail ? (
                        <>
                            <Grid item xs={4}>
                                <Item>Name: {charDetail.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Role: {charDetail.role}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {charDetail.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {charDetail.campaign} </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Culture: {charDetail.culture}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Concept: {charDetail.concept}</Item>
                            </Grid>
                            <CharacterAttributes charDetail={charDetail} />
                            <CharacterSkills charDetail={charDetail} />
                            <CharacterSpecialSkills charDetail={charDetail} />
                            <CharacterMarkers charDetail={charDetail} />

                        </>
                    ) : <></>}
                </Grid>
            </Box>
        </>
    )
}

export default CharacterSheet;
