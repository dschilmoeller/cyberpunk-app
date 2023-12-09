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
import CharacterSheetCyberware from './Cyberware';
import Backpack from './Backpack';
import CharacterSheetNotes from './Notes';

function CharacterSheet() {
    const charDetail = useSelector(store => store.characterDetail);
    const charStatus = useSelector(store => store.characterStatus);
    const charWeapons = useSelector(store => store.characterGear.weapons);
    const charVehicles = useSelector(store => store.characterGear.vehicles);
    const charArmor = useSelector(store => store.characterGear.armor);
    const charShield = useSelector(store => store.characterGear.shield);

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const FiveMinutesMillisecs = 300000;

    // run once on page load and fetch character detail and master item lists.
    useEffect(() => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        dispatch({ type: 'FETCH_CHARACTER_MOD_MASTER', payload: params.id });
        dispatch({ type: "FETCH_MASTER_LISTS" })
    }, [])

    // run on page load and start again when a change is made.
    // this should in principle create a periodic 'autosave' feature. Seems to work.
    useEffect(() => {
        const interval = setInterval(() => {
            saveCharacter();
        }, FiveMinutesMillisecs);

        // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
        return () => clearInterval(interval);
    }, [charStatus])


    const saveCharacter = (useHist) => {
        const test = charStatus
        dispatch({ type: "SAVE_CHARACTER_SHEET", payload: { charID: params.id, charParams: { charStatus: charStatus, charWeapons: charWeapons, charVehicles: charVehicles, charArmor: charArmor, charShield: charShield } } })
        if (useHist === 'useHist') {
            history.push('/characterlist')
        }
    }

    const [selectedInventory, setSelectedInventory] = useState('weapons')
    const handleInventorySelect = (event, newValue) => {
        setSelectedInventory(newValue)
    }

    if (charDetail.id) {
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
                                    <Item sx={{ fontSize: '1.5em', padding: 0 }}>Name: {charDetail.handle}</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item sx={{ fontSize: '1.5em', padding: 0 }}>Player: {charDetail.player}</Item>
                                </Grid>
                                <Grid item xs={4}>
                                    <Item sx={{ fontSize: '1.5em', padding: 0 }}>Campaign: {charDetail.campaign_name} </Item>
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
                                    <Tab value='cyberware' label='Cyberware' />
                                    <Tab value='vehicles' label='Vehicles' />
                                    <Tab value='notes' label='My Notes' />
                                </Tabs>

                                {selectedInventory === 'weapons' ? (<>
                                    <Grid item xs={12}>
                                        <Weapons />
                                    </Grid>
                                </>) : <></>}

                                {selectedInventory === 'backpack' ? (<>
                                    <Backpack />
                                </>) : <></>}

                                {selectedInventory === 'cyberware' ? (<>
                                    <CharacterSheetCyberware />
                                </>) : <></>}

                                {selectedInventory === 'vehicles' ? (<>
                                    <CharacterVehicles />
                                </>) : <></>}

                                {selectedInventory === 'netrunner' ? (<>
                                    <CharacterNetrunner />
                                </>) : <></>}

                                {selectedInventory === 'notes' ? (<>
                                    <CharacterSheetNotes />
                                </>) : <></>}

                            </>
                        ) : <></>}
                    </Grid>
                </Box>
            </>
        )
    }
}

export default CharacterSheet;
