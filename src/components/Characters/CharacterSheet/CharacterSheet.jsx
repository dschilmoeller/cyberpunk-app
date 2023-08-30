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
import CharacterVehicles from './CharacterVehicles';
import CharacterNetrunner from './CharacterNetrunner';

import Backpack from './Backpack';

function CharacterSheet() {
    const charDetail = useSelector((store) => store.characterDetail);
    const charStatus = useSelector(store => store.characterStatus)
    const charWeapons = useSelector((store) => store.characterWeapons)
    const charVehicles = useSelector((store) => store.characterVehicles)

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        dispatch({ type: 'FETCH_MISC_GEAR_LIST' });
        dispatch({ type: 'FETCH_VEHICLE_MOD_LIST'});
        dispatch({ type: 'FETCH_CHARACTER_MOD_MASTER', payload: params.id});
    }, [])

    const saveCharacter = (useHist) => {
        dispatch({ type: "SAVE_CHARACTER_SHEET", payload: { charID: params.id, charParams: { charStatus: charStatus, charWeapons: charWeapons, charVehicles: charVehicles } } })
        if (useHist === 'useHist') {
            history.push('/characterlist')
        }
    }

    const [selectedInventory, setSelectedInventory] = useState('weapons')
    const handleInventorySelect = (event, newValue) => {
        setSelectedInventory(newValue)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item display={'flex'} justifyContent={'center'} xs={6}>
                        <Button onClick={() => saveCharacter('useHist')}>Back to Character List</Button>
                    </Grid>
                    <Grid item display={'flex'} justifyContent={'center'} xs={6}>
                        <Button onClick={() => saveCharacter()}>Save Current Status</Button>
                    </Grid>
                </Grid>
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
                                <Tab value='vehicles' label='Vehicles' />
                            </Tabs>

                            {selectedInventory === 'weapons' ? (<>
                                <Grid item xs={12}>
                                    <Weapons />
                                </Grid>
                            </>) : <></>}

                            {selectedInventory === 'backpack' ? (<>
                                <Backpack />
                            </>) : <></>}

                            {selectedInventory === 'vehicles' ? (<>
                                <CharacterVehicles />
                            </>) : <></> }

                            {selectedInventory === 'netrunner' ? (<>
                                <CharacterNetrunner />
                            </>) : <></>}

                        </>
                    ) : <></>}
                </Grid>
            </Box>
        </>
    )
}

export default CharacterSheet;
