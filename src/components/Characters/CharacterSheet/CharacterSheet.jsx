// to be static-ish char sheet, used during play
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CharacterAttributes from './CharacterAttributes';
import CharacterSkills from './CharacterSkills';
import CharacterMarkers from './CharacterMarkers';
import CharacterRoleAbilities from './CharacterRoleAbilities';

import Weapons from './Weapons';
import CharacterNetrunner from './CharacterNetrunner';
import BackPackDialog from './BackPackDialog';
import Backpack from './Backpack';

function CharacterSheet() {
    const charDetail = useSelector((store) => store.characterDetail);
    const charStatus = useSelector(store => store.characterStatus)
    const charWeapons = useSelector((store) => store.characterWeapons)
    const charMiscGear = useSelector(store => store.characterMiscGear)

    // console.log(`Characters:`, characterList);

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        dispatch({ type: 'FETCH_MISC_GEAR_LIST' })
    }, [])

    const saveCharacter = () => {
        dispatch({ type: "SAVE_CHARACTER_SHEET", payload: { charID: params.id, charParams: { charStatus: charStatus, charWeapons: charWeapons } } })
    }

    const [selectedInventory, setSelectedInventory] = useState('weapons')
    const handleInventorySelect = (event, newValue) => {
        setSelectedInventory(newValue)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <h2>Character Sheet - IN PLAY</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => saveCharacter()}>Save Current Status</Button>

                <Grid container spacing={1}>

                    {charDetail ? (
                        <>
                            <Grid item xs={4}>
                                <Item>Name: {charDetail.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {charDetail.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {charDetail.campaign} </Item>
                            </Grid>
                            <CharacterAttributes charDetail={charDetail} />
                            <CharacterSkills charDetail={charDetail} />
                            <CharacterRoleAbilities charDetail={charDetail} />
                            <CharacterMarkers charDetail={charDetail} />

                            <Tabs
                                value={selectedInventory}
                                onChange={handleInventorySelect}
                                indicatorColor='primary'
                                textColor='secondary'>
                                <Tab value='weapons' label='Weapons' />
                                {charDetail.netrunner > 0 && <Tab value='netrunner' label='Netrunner' />}
                                <Tab value='backpack' label='Backpack' />
                            </Tabs>

                            {selectedInventory === 'weapons' ? (<>
                                <Grid item xs={12}>
                                    <Weapons />
                                </Grid>
                            </>) : <></>}

                            {selectedInventory === 'netrunner' ? (<>
                                <CharacterNetrunner />
                            </>) : <></>}

                            {selectedInventory === 'backpack' ? (<>
                                <Backpack />
                                {/* <Grid item xs={12}>
                                    <Grid container>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={6}><BackPackDialog prop={'Open Backpack'} /></Grid>
                                        <Grid item xs={3}></Grid>
                                    </Grid>
                                </Grid> */}
                            </>) : <></>}

                        </>
                    ) : <></>}
                </Grid>
            </Box>
        </>
    )
}

export default CharacterSheet;
