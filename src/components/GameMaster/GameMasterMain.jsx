import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Item from '../Characters/CharacterSheet/Item';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterMain() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const charDetail = useSelector(store => store.characterDetail)
    const campaignList = useSelector(store => store.campaigns)

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)
    const [campaignName, setCampaignName] = useState(charDetail.campaign_name)
    const [allowDeleteCharacter, setAllowDeleteCharacter] = useState(false)
    const [allowPermHumanityChange, setAllowPermHumanityChange] = useState(false)

    const [campaignWords, setCampaignWords] = useState(charDetail.campaignWords)

    useEffect(() => {
        setHandle(charDetail.handle)
        setPlayer(charDetail.player)
        setCampaign(charDetail.campaign)
        effectChangeCampaign(charDetail.campaign)
    }, [charDetail.id, charDetail.campaign])

    useEffect(() => {
        dispatch({ type: "FETCH_CAMPAIGNS" })
    }, [])

    const effectChangeCampaign = (value) => {
        campaignList.map(campaign => {
            if (value == campaign.campaign_id) {
                setCampaignName(campaign.campaign_name)
                setCampaign(value)
            }
        })
    }

    const changeCampaign = (value) => {
        campaignList.map(campaign => {
            if (value == campaign.campaign_id) {
                setCampaignName(campaign.campaign_name)
                setCampaign(value)
                dispatch({ type: "GM_CHANGE_CAMPAIGN", payload: { campaign: campaign.campaign_id, campaign_name: campaign.campaign_name, campaignWords: ' (changed)' } })
            }
        })
        setCampaignWords(' (changed)')
    }

    const changeHumanity = (type, amount) => {
        if (type === 'temp' && (amount + charDetail.temp_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charDetail.temp_humanity_loss >= 0)) {
            dispatch({ type: 'GM_CHANGE_TEMP_HUMANITY_LOSS', payload: amount })
        } else if (type === 'perm' && (amount + charDetail.temp_humanity_loss + charDetail.perm_humanity_loss <= 40) && (amount + charDetail.perm_humanity_loss >= 0)) {
            dispatch({ type: 'GM_CHANGE_PERM_HUMANITY_LOSS', payload: amount })
        } else {
            setShowSnackbar(true)
        }
    }

    const changeBank = (incoming) => {
        if (charDetail.bank + incoming >= 0) {
            dispatch({ type: 'GM_CHANGE_BANK', payload: incoming })
        } else {
            setShowSnackbar(true)
        }
    }

    const changeXP = (incoming) => {
        if (charDetail.max_xp + incoming >= charDetail.spent_xp) {
            dispatch({ type: 'GM_CHANGE_XP', payload: incoming })
        } else {
            setShowSnackbar(true)
        }
    }

    const deleteCharacter = () => {
        dispatch({ type: "DELETE_CHARACTER", payload: { charDetailID: charDetail.id, user_id: charDetail.user_id } })
        history.push('/gamemaster/')
    }

    return (<>
        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Can't make selected change!
            </Alert>
        </Snackbar>

        <Grid container paddingTop={3} spacing={2} alignItems="center">

            <Grid item xs={2.5} textAlign={'center'}>Handle: {charDetail.handle}</Grid>
            <Grid item xs={2.5}><TextField fullWidth variant='standard' label='Change Handle' value={handle || ''} onChange={(event) => { setHandle(event.target.value) }} /></Grid>
            <Grid item xs={2.5} textAlign={'center'}>Player: {charDetail.player}</Grid>
            <Grid item xs={2.5} marginRight={2}><TextField fullWidth variant='standard' label='Change Player' value={player || ''} onChange={(event) => { setPlayer(event.target.value) }} /></Grid>

            <Grid item xs={3.5} textAlign={'center'}>Campaign{campaignWords}: {campaignName}</Grid>
            <Grid item xs={3.5} marginRight={2}>
                <Select
                    value={campaign}
                    fullWidth
                    onChange={e => changeCampaign(e.target.value)}>
                    {campaignList.map(campaign => {
                        return <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.campaign_name}</MenuItem>
                    })}
                </Select>
            </Grid>


            <Grid item xs={4}>
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

        <Grid item xs={12} textAlign={'center'}><h1>Humanity</h1></Grid>
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

        </Grid>) : <></>}

        <Grid item xs={12} textAlign={'center'}><h1>Money</h1></Grid>
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
        </Grid>) : <></>}

        <Grid item xs={12} textAlign={'center'}><h1>Experience</h1></Grid>
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