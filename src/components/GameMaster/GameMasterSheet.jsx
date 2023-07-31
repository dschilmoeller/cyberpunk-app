import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';
import TextField from '@mui/material/TextField';



export default function GameMasterSheet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const charDetail = useSelector(store => store.characterDetail)

    // State handlers for various fields
    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [role, setRole] = useState(charDetail.role)
    const [culture, setCulture] = useState(charDetail.culture)
    const [concept, setConcept] = useState(charDetail.concept)
    const [campaign, setCampaign] = useState(charDetail.campaign)
    const [bank, setBank] = useState(110)

    useEffect(() => {
        // fetch initial details
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        // required to make inputs default to existing data
        setHandle(charDetail.handle)
        setPlayer(charDetail.player)
        setRole(charDetail.role)
        setCulture(charDetail.culture)
        setConcept(charDetail.concept)
        setCampaign(charDetail.campaign)
        setBank(charDetail.bank)
    }, [charDetail.handle])

    const changeXP = (incoming) => {
        if (charDetail.max_xp + incoming >= charDetail.spent_xp) {
            dispatch({type: 'GM_CHANGE_XP', payload: incoming})
        } else {
            console.log(`Bad dog`);
        }
    }

    const changeBank = (incoming) => {
        if (charDetail.bank + incoming >= 0) {
            dispatch({type: 'GM_CHANGE_BANK', payload: incoming})
            setBank(bank + incoming)
        } else {
            console.log(`No biscuit`);
        }
    }

    return (<>
        <h1>Character Details: </h1>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}><Item><Button variant='contained'>Save Changes</Button></Item></Grid>

            <Grid item xs={3} textAlign={'center'}>Handle: {charDetail.handle}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Handle' value={handle || ''} onChange={(event) => { setHandle(event.target.value) }} /></Grid>
            <Grid item xs={3} textAlign={'center'}>Player: {charDetail.player}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Player' value={player || ''} onChange={(event) => { setPlayer(event.target.value) }} /></Grid>

            <Grid item xs={3} textAlign={'center'}>Role: {charDetail.role}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Role' value={role || ''} onChange={(event) => { setRole(event.target.value) }} /></Grid>
            <Grid item xs={3} textAlign={'center'}>Culture: {charDetail.culture}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Culture' value={culture || ''} onChange={(event) => { setCulture(event.target.value) }} /></Grid>

            <Grid item xs={3} textAlign={'center'}>Concept: {charDetail.concept}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Concept' value={concept || ''} onChange={(event) => { setConcept(event.target.value) }} /></Grid>
            <Grid item xs={3} textAlign={'center'}>Campaign: {charDetail.campaign}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Campaign' value={campaign || ''} onChange={(event) => { setCampaign(event.target.value) }} /></Grid>
        </Grid>
        <br />
        <br />
        <h1>Experience</h1>
        <Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={4} textAlign={'center'}>Current XP: {charDetail.max_xp}</Grid>
            <Grid item xs={4} textAlign={'center'}>Spent XP: {charDetail.spent_xp}</Grid>
            <Grid item xs={4} textAlign={'center'}>Available XP: {charDetail.max_xp - charDetail.spent_xp}</Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(1)}>Add 1 XP </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(5)}>Add 5 XP </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(10)}>Add 10 XP </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(-1)}>Remove 1 XP </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(-5)}>Remove 5 XP </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeXP(-10)}>Remove 10 XP </Button></Grid>
        </Grid>
        <br />
        <br />
        <h1>Money</h1>
        {bank >= 0 ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>Current Cash on Hand: ${bank.toLocaleString('en-US')}</Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(1)}>Add $1 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(10)}>Add $10 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(100)}>Add $100 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(1000)}>Add $1,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(5000)}>Add $5,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(10000)}>Add $10,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-1)}>Deduct $1 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-10)}>Deduct $10 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-100)}>Deduct $100 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-1000)}>Deduct $1,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-5000)}>Deduct $5,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button variant='contained' onClick={() => changeBank(-10000)}>Deduct $10,000 </Button></Grid>
        </Grid>) : <></>}
    </>)
}