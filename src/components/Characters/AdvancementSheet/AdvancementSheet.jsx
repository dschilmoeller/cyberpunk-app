import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../CharacterSheet/Item';

import AdvancementAttributes from './AdvancementAttributes';
import AdvancementSkills from './AdvancementSkills';
import AdvancementSpecial from './AdvancementSpecial';
import AdvancementOther from './AdvancementOther';

import AdvancementGearArmor from './AdvancementGearArmor';
import AdvancementGearWeapons from './AdvancementGearWeapons';
import AdvancementGearOther from './AdvancementGearOther';

function AdvancementSheet() {
    const advancementDetails = useSelector((store) => store.advancementDetail[0]);

    // console.log(`Characters:`, characterList);
    const [heading, setHeading] = useState('Character Sheet - ADVANCEMENT/EDITING');
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    let handle = advancementDetails.handle

    const [opener, setOpener] = useState('')

    useEffect(() => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        dispatch({type: "FETCH_ARMOR_LIST"})
        dispatch({type: "FETCH_SHIELD_LIST"})
        dispatch({type: "FETCH_WEAPON_LIST"})
        dispatch({type: "FETCH_MISC_GEAR_LIST"})
        dispatch({type: "FETCH_CYBERWARE_LIST"})
    }, [])
    
    const fetchCharacterDetail = () => {
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
    }

    return (
        <>
            <div>
                <h2>{heading}</h2>
                <Button onClick={() => history.push('/characterlist')}>Back to Character List</Button>
                <Button onClick={() => fetchCharacterDetail()}>Fetch Character Details</Button>

                {advancementDetails ? (
                    <>
                        <Grid container>
                            <Grid item xs={4}>
                                <Item>Name: {advancementDetails.handle}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Role: {advancementDetails.role}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Player: {advancementDetails.player}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Campaign: {advancementDetails.campaign} </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Culture: {advancementDetails.culture}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Concept: {advancementDetails.concept}</Item>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}><Item>Available XP: {advancementDetails.max_xp - advancementDetails.spent_xp}</Item></Grid>
                        </Grid>
                    </>
                ) : <></>}

                <h2>I want to change...</h2>
                <Grid container>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Attributes')}>Attributes</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Skills')}>Skills</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Role')}>Role</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Other')}>Other Traits</Button></Item></Grid>

                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Armor')}>Equip Armor</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Weapons')}>Equip Weapons</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Gear')}>See Other Gear</Button></Item></Grid>
                    <Grid item xs={3}><Item><Button onClick={() => setOpener('Cyberware')}>Equip Cyberware</Button></Item></Grid>
                </Grid>

                {opener === 'Attributes' ? (<>
                    <AdvancementAttributes />
                </>) : <></>}

                {opener === 'Skills' ? (<>
                    <AdvancementSkills />
                </>) : <></>}

                {opener === 'Role' ? (<>
                    <AdvancementSpecial />
                </>) : <></>}

                {opener === 'Other' ? (<>
                    <AdvancementOther />
                </>) : <></>}

                {opener === 'Armor' ? (<>
                    <AdvancementGearArmor />
                </>) : <></>}

                {opener === 'Weapons' ? (<>
                    <AdvancementGearWeapons />
                </>) : <></>}

                {opener === 'Gear' ? (<>
                    <AdvancementGearOther />
                </>) : <></>}

                {opener === 'Cyberware' ? (<>
                    <h1>Cyberware</h1>
                </>) : <></>}


            </div>
        </>
    )
}

export default AdvancementSheet;
