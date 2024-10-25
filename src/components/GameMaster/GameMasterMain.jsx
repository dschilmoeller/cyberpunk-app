import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Button, FormControl, InputLabel, Grid, TextField, Switch, FormGroup, FormControlLabel, Select, MenuItem } from '@mui/material';

import Item from '../Characters/CharacterSheet/Item';

import { changeCharacterCampaign } from './gm.services';

export default function GameMasterMain({ charDetail, campaignList, setCharDetail, setPageAlert }) {
    const history = useHistory();

    const euroBuck = `\u20AC$`

    const [allowDeleteCharacter, setAllowDeleteCharacter] = useState(false)
    const [allowPermHumanityChange, setAllowPermHumanityChange] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState('');

    const changeCampaign = async (campaign_id) => {
        const campaignObj = {
            campaign_id,
            charID: charDetail.id
        }

        try {
            let result = await changeCharacterCampaign(campaignObj);
            if (result === 'OK'){
                setPageAlert({ open: true, message: 'Success', severity: 'info'})
                // Change current state to reflect change.
                setCharDetail({
                    ...charDetail, 
                    campaign_name: campaignList.filter((campaign) => campaign.campaign_id === campaign_id)[0].campaign_name });
            } else {
                setPageAlert({ open: true, message: 'Something is awry', severity: 'info'})
            }
        } catch (error) {
            setPageAlert({ open: true, message: 'Error', severity: 'error'})
            console.error('Error Changing Campaign:', error)
        }
    }

    // const changeHumanity = (type, amount) => {
    //     if (type === 'temp' && (amount + charDetail.temp_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charDetail.temp_humanity_loss >= 0)) {
    //         dispatch({ type: 'GM_CHANGE_TEMP_HUMANITY_LOSS', payload: amount })
    //     } else if (type === 'perm' && (amount + charDetail.temp_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charDetail.perm_humanity_loss >= 0)) {
    //         dispatch({ type: 'GM_CHANGE_PERM_HUMANITY_LOSS', payload: amount })
    //     } else {
    //         setShowSnackbar(true)
    //     }
    // }

    // const changeBank = (incoming) => {
    //     if (charDetail.bank + incoming >= 0) {
    //         dispatch({ type: 'GM_CHANGE_BANK', payload: incoming })
    //     } else {
    //         setShowSnackbar(true)
    //     }
    // }

    // const changeXP = (incoming) => {
    //     if (charDetail.max_xp + incoming >= charDetail.spent_xp) {
    //         dispatch({ type: 'GM_CHANGE_XP', payload: incoming })
    //     } else {
    //         setShowSnackbar(true)
    //     }
    // }

    // const deleteCharacter = () => {
    //     dispatch({ type: "DELETE_CHARACTER", payload: { charDetailID: charDetail.id, user_id: charDetail.user_id } })
    //     history.push('/gamemaster/')
    // }

    return (<>
        <Grid container paddingTop={3} spacing={1} alignItems="center">

            <Grid item xs={3} textAlign={'center'}>Handle: {charDetail.handle}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Handle' value={charDetail.handle || ''} onChange={(event) => { setHandle(event.target.value) }} /></Grid>
            <Grid item xs={3} textAlign={'center'}>Player: {charDetail.player}</Grid>
            <Grid item xs={3}><TextField fullWidth variant='standard' label='Change Player' value={charDetail.player || ''} onChange={(event) => { setPlayer(event.target.value) }} /></Grid>

            <Grid item xs={6} textAlign={'center'}>Campaign: {charDetail.campaign_name}</Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Change Campaign</InputLabel>
                    <Select
                        value={selectedCampaign}
                        fullWidth
                        label='Change Campaign'
                        onChange={e => changeCampaign(e.target.value)}>
                        {campaignList.map(campaign => {
                            return <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.campaign_name}</MenuItem>
                        })}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <Item>
                    <FormGroup>
                        <FormControlLabel control={<Switch
                            checked={allowDeleteCharacter}
                            onChange={(e) => setAllowDeleteCharacter(e.target.checked)} />} label="Allow Character Deletion" />
                    </FormGroup>
                </Item>
            </Grid>

            {allowDeleteCharacter === false ? (<>
                <Grid item xs={12} padding={3} display={'flex'} justifyContent={'center'}>
                    <Button variant='contained' fullWidth color='error' disabled>Delete Character</Button>
                </Grid>
            </>) : (<>
                <Grid item xs={12} padding={3} display={'flex'} justifyContent={'center'}>
                    <Button variant='contained' fullWidth color='error' onClick={() => deleteCharacter()}>Delete Character</Button>
                </Grid>
            </>)}

        </Grid>

        {/* <Grid item xs={12} textAlign={'center'}><h1>Humanity</h1></Grid>
        {charDetail.temp_humanity_loss >= 0 ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={4} textAlign={'center'}>Current Total Humanity Loss: {charDetail.perm_humanity_loss + charDetail.temp_humanity_loss} / 40</Grid>
            <Grid item xs={4} textAlign={'center'}>Current Permanent Humanity Loss: {charDetail.perm_humanity_loss}</Grid>
            <Grid item xs={4} textAlign={'center'}>Current Temporary Humanity Loss: {charDetail.temp_humanity_loss}</Grid>
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

        </Grid>) : <></>} */}

        {/* <Grid item xs={12} textAlign={'center'}><h1>Money</h1></Grid>
        {charDetail.bank >= 0 ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>Current Cash on Hand: {euroBuck}{charDetail.bank.toLocaleString()}</Grid>
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
        </Grid>) : <></>} */}

        {/* <Grid item xs={12} textAlign={'center'}><h1>Experience</h1></Grid>
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
            </Grid>) : <></>} */}


    </>)
}