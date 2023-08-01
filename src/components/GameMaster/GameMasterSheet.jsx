import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function GameMasterSheet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const charDetail = useSelector(store => store.characterDetail)
    const charStatus = useSelector(store => store.characterStatus)

    // State handlers for various fields
    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [role, setRole] = useState(charDetail.role)
    const [culture, setCulture] = useState(charDetail.culture)
    const [concept, setConcept] = useState(charDetail.concept)
    const [campaign, setCampaign] = useState(charDetail.campaign)

    const [allowPermHumanityChange, setAllowPermHumanityChange] = useState(false)

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
    }, [charDetail.id])

    const changeXP = (incoming) => {
        if (charDetail.max_xp + incoming >= charDetail.spent_xp) {
            dispatch({ type: 'GM_CHANGE_XP', payload: incoming })
        } else {
            console.log(`Bad dog`);
        }
    }

    const changeBank = (incoming) => {
        if (charDetail.bank + incoming >= 0) {
            dispatch({ type: 'GM_CHANGE_BANK', payload: incoming })
        } else {
            console.log(`No biscuit`);
        }
    }

    const changeHumanity = (type, amount) => {
        if (type === 'temp' && (amount + charStatus.current_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charStatus.current_humanity_loss >= 0)) {
            dispatch({ type: 'GM_CHANGE_TEMP_HUMANITY_LOSS', payload: amount })
        } else if (type === 'perm' && (amount + charStatus.current_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charDetail.perm_humanity_loss >= 0)) {
            dispatch({ type: 'GM_CHANGE_PERM_HUMANITY_LOSS', payload: amount })
        } else {
            alert('Error!')
        }
    }

    const saveCharacter = () => {
        dispatch({type: "SAVE_GM_CHANGES", payload: {charDetail: charDetail, charStatus: charStatus, handle, player, role, culture, concept, campaign}})
    }

    return (<>
        <h1>Character Details: </h1>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}><Item><Button variant='contained' onClick={() => saveCharacter()}>Save Changes</Button></Item></Grid>

            <Grid item xs={2} textAlign={'center'}>Handle: {charDetail.handle}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Handle' value={handle || ''} onChange={(event) => { setHandle(event.target.value) }} /></Grid>
            <Grid item xs={2} textAlign={'center'}>Player: {charDetail.player}</Grid>
            <Grid item xs={3} marginRight={2}><TextField fullWidth variant='standard' label='Change Player' value={player || ''} onChange={(event) => { setPlayer(event.target.value) }} /></Grid>

            <Grid item xs={2} textAlign={'center'}>Role: {charDetail.role}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Role' value={role || ''} onChange={(event) => { setRole(event.target.value) }} /></Grid>
            <Grid item xs={2} textAlign={'center'}>Culture: {charDetail.culture}</Grid>
            <Grid item xs={3} marginRight={2}><TextField fullWidth variant='standard' label='Change Culture' value={culture || ''} onChange={(event) => { setCulture(event.target.value) }} /></Grid>

            <Grid item xs={2} textAlign={'center'}>Concept: {charDetail.concept}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Concept' value={concept || ''} onChange={(event) => { setConcept(event.target.value) }} /></Grid>
            <Grid item xs={2} textAlign={'center'}>Campaign: {charDetail.campaign}</Grid>
            <Grid item xs={3} marginRight={2}><TextField fullWidth variant='standard' label='Change Campaign' value={campaign || ''} onChange={(event) => { setCampaign(event.target.value) }} /></Grid>
        </Grid>
        <br />
        <br />
        <h1>Humanity</h1>
        {charStatus.current_humanity_loss >= 0 ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={4} textAlign={'center'}>Current Total Humanity Loss: {charDetail.perm_humanity_loss + charStatus.current_humanity_loss} / 40</Grid>
            <Grid item xs={4} textAlign={'center'}>Current Permanent Humanity Loss: {charDetail.perm_humanity_loss}</Grid>
            <Grid item xs={4} textAlign={'center'}>Current Temporary Humanity Loss: {charStatus.current_humanity_loss}</Grid>
            <Grid item xs={3} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeHumanity('temp', -1)}>Restore 1 Temp Humanity</Button></Grid>
            <Grid item xs={3} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeHumanity('temp', -5)}>Restore 5 Temp Humanity</Button></Grid>
            <Grid item xs={3} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeHumanity('temp', 1)}>Remove 1 Temp Humanity</Button></Grid>
            <Grid item xs={3} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeHumanity('temp', 5)}>Remove 5 Temp Humanity</Button></Grid>
            {allowPermHumanityChange ? (<>
                <Grid item xs={12} textAlign={'center'} alignContent={'center'}>
                    <FormGroup sx={{ position: 'flex', alignItems: 'center' }} >
                        <FormControlLabel control={<Switch
                            checked={allowPermHumanityChange}
                            onChange={(e) => setAllowPermHumanityChange(e.target.checked)} />} label="Allow Permanent Humanity Changes" />
                    </FormGroup>
                </Grid>
                <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeHumanity('perm', -1)}>Restore 1 Permanent Humanity</Button></Grid>
                <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeHumanity('perm', 1)}>Remove 1 Permanent Humanity</Button></Grid>
            </>) : (<>
                <Grid item xs={12} textAlign={'center'} alignContent={'center'}>
                    <FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
                        <FormControlLabel control={<Switch
                            checked={allowPermHumanityChange}
                            onChange={(e) => setAllowPermHumanityChange(e.target.checked)} />} label="Allow Permanent Humanity Changes" />
                    </FormGroup>
                </Grid>
            </>)}

        </Grid>) : <></>}

        <h1>Money</h1>
        {charDetail.bank ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>Current Cash on Hand: ${charDetail.bank}</Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(1)}>Add $1 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(10)}>Add $10 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(100)}>Add $100 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-1)}>Deduct $1 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-10)}>Deduct $10 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-100)}>Deduct $100 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(1000)}>Add $1,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(5000)}>Add $5,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeBank(10000)}>Add $10,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-1000)}>Deduct $1,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-5000)}>Deduct $5,000 </Button></Grid>
            <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeBank(-10000)}>Deduct $10,000 </Button></Grid>
        </Grid>) : <></>}

        <h1>Experience</h1>
        {charDetail.max_xp >= 0 ? (
            <Grid container spacing={2} alignContent={'center'}>
                <Grid item xs={4} textAlign={'center'}>Current XP: {charDetail.max_xp}</Grid>
                <Grid item xs={4} textAlign={'center'}>Spent XP: {charDetail.spent_xp}</Grid>
                <Grid item xs={4} textAlign={'center'}>Available XP: {charDetail.max_xp - charDetail.spent_xp}</Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeXP(1)}>Add 1 XP </Button></Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeXP(5)}>Add 5 XP </Button></Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeXP(10)}>Add 10 XP </Button></Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeXP(-1)}>Remove 1 XP </Button></Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeXP(-5)}>Remove 5 XP </Button></Grid>
                <Grid item xs={2} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeXP(-10)}>Remove 10 XP </Button></Grid>
            </Grid>) : <></>}

    </>)
}