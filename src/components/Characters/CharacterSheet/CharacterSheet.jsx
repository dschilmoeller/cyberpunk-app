// to be static-ish char sheet, used during play
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import Pharmaceuticals from './Pharmaceuticals';
import CharacterSheetNotes from './Notes';
import CharacterSheetContacts from './Contacts';

function CharacterSheet() {
    const charDetail = useSelector(store => store.characterDetail);

    const dispatch = useDispatch();
    const params = useParams();

    // run once on page load and fetch character detail and master item lists.
    useEffect(() => {
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        dispatch({ type: 'FETCH_CHARACTER_MOD_MASTER', payload: params.id });
        dispatch({ type: "FETCH_MASTER_LISTS" })
    }, [])

    const [selectedInventory, setSelectedInventory] = useState('weapons')
    const handleInventorySelect = (event, newValue) => {
        setSelectedInventory(newValue)
    }

    if (charDetail.id) {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>      
                    <Grid container spacing={1}>
                        {charDetail ? (
                            <>
                                <Grid item xs={4}>
                                    <Item sx={{ fontSize: '1.5em', padding: 0 }}>Handle: {charDetail.handle}</Item>
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
                                    <Tab value='pharma' label='Pharmaceuticals' />
                                    <Tab value='cyberware' label='Cyberware' />
                                    <Tab value='vehicles' label='Vehicles' />
                                    <Tab value='notes' label='My Notes' />
                                    <Tab value='contacts' label='Contacts' />
                                </Tabs>

                                {selectedInventory === 'weapons' ? (<>
                                    <Weapons />
                                </>) : <></>}

                                {selectedInventory === 'backpack' ? (<>
                                    <Backpack />
                                </>) : <></>}

                                {selectedInventory === 'pharma' ? (<>
                                    <Pharmaceuticals />
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

                                {selectedInventory === 'contacts' ? (<>
                                    <CharacterSheetContacts />
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
