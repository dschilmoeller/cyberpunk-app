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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterSheet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const charDetail = useSelector(store => store.characterDetail)

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    // State handlers for various fields
    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)

    const [allowPermHumanityChange, setAllowPermHumanityChange] = useState(false)
    const [allowPermLuckChange, setAllowPermLuckChange] = useState(false)
    const [allowDeleteCharacter, setAllowDeleteCharacter] = useState(false)

    const fulldot = ` \u2b24`
    const emptydot = ` \u25ef`

    useEffect(() => {
        // fetch initial details
        dispatch({ type: "FETCH_CHARACTER_DETAIL", payload: params.id })
        // required to make inputs default to existing data
        setHandle(charDetail.handle)
        setPlayer(charDetail.player)
        setCampaign(charDetail.campaign)
    }, [charDetail.id])

    const attDotReturn = (attribute, max) => {
        let returnedDots = ''
        for (let i = 0; i < attribute; i++) {
            returnedDots += fulldot;
        }
        let j = attribute
        for (j; j <= (max - 1); j++) {
            returnedDots += emptydot
        }
        return returnedDots
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

    const changeStreetCred = (incoming) => {
        if (charDetail.street_cred + incoming >= 0 && charDetail.street_cred + incoming <= 10) {
            dispatch({ type: 'GM_CHANGE_STREET_CRED', payload: incoming })
        } else {
            setShowSnackbar(true)
        }
    }

    const changeLuck = (incoming) => {
        if (charDetail.max_luck + incoming <= 10 && charDetail.max_luck + incoming >= 0) {
            dispatch({ type: 'GM_CHANGE_PERM_LUCK', payload: incoming })
        } else {
            setShowSnackbar(true)
        }
    }

    const saveCharacter = () => {
        dispatch({ type: "SAVE_GM_CHANGES", payload: { charDetail: charDetail, handle, player, campaign } })
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
        </Snackbar >

        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}><h1>Character Details: </h1></Grid>
            <Grid item xs={6}><Item><FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
                <FormControlLabel control={<Switch
                    checked={allowDeleteCharacter}
                    onChange={(e) => setAllowDeleteCharacter(e.target.checked)} />} label="Allow Character Deletion" />
            </FormGroup>
            </Item>
            </Grid>

            {allowDeleteCharacter ? (<>
                <Grid item xs={6}><Item><Button variant='contained' onClick={() => saveCharacter()}>Save Changes</Button></Item></Grid>
                <Grid item xs={6}><Item><Button variant='contained' color='error' onClick={() => deleteCharacter()}>Delete Character</Button></Item></Grid>

            </>) : (<>
                <Grid item xs={12}><Item><Button variant='contained' onClick={() => saveCharacter()}>Save Changes</Button></Item></Grid>
            </>)}

            <Grid item xs={6} textAlign={'center'}>Handle: {charDetail.handle}</Grid>
            <Grid item xs={4}><TextField fullWidth variant='standard' label='Change Handle' value={handle || ''} onChange={(event) => { setHandle(event.target.value) }} /></Grid>
            <Grid item xs={6} textAlign={'center'}>Player: {charDetail.player}</Grid>
            <Grid item xs={4} marginRight={2}><TextField fullWidth variant='standard' label='Change Player' value={player || ''} onChange={(event) => { setPlayer(event.target.value) }} /></Grid>

            <Grid item xs={6} textAlign={'center'}>Campaign: {charDetail.campaign}</Grid>
            <Grid item xs={4} marginRight={2}><TextField fullWidth variant='standard' label='Change Campaign' value={campaign || ''} onChange={(event) => { setCampaign(event.target.value) }} /></Grid>
        </Grid>
        <br />
        <br />
        <h1>Humanity</h1>
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

        <h1>Money</h1>
        {charDetail.bank >= 0 ? (<Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={12} textAlign={'center'}>Current Cash on Hand: {euroBuck}{charDetail.bank}</Grid>
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

        <h1>Street Cred</h1>
        <Grid container spacing={2} alignContent={'center'}>
            <Grid item xs={6} textAlign={'center'}>Street Cred</Grid>
            <Grid item xs={6} textAlign={'center'}>{attDotReturn(charDetail.street_cred, 10)}</Grid>
            <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeStreetCred(1)}>Add 1 Street Cred</Button></Grid>
            <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeStreetCred(-1)}>Remove 1 Street Cred</Button></Grid>
        </Grid>

        <h1>Luck</h1>
        <Grid container>
            <Grid item xs={12} textAlign={'center'}>Current Maximum Luck: {attDotReturn(charDetail.max_luck, 10)} </Grid>
        </Grid>

        {allowPermLuckChange ? (<>
            <Grid item xs={12} textAlign={'center'} alignContent={'center'}>
                <FormGroup sx={{ position: 'flex', alignItems: 'center' }} >
                    <FormControlLabel control={<Switch
                        checked={allowPermLuckChange}
                        onChange={(e) => setAllowPermLuckChange(e.target.checked)} />} label="Allow Permanent Luck Changes" />
                </FormGroup>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='success' onClick={() => changeLuck(1)}>Add 1 Permanent Luck</Button></Grid>
                <Grid item xs={6} textAlign={'center'}><Button fullWidth variant='contained' color='error' onClick={() => changeLuck(-1)}>Remove 1 Permanent Luck</Button></Grid>
            </Grid>
        </>) : (<>
            <Grid item xs={12} textAlign={'center'} alignContent={'center'}>
                <FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
                    <FormControlLabel control={<Switch
                        checked={allowPermLuckChange}
                        onChange={(e) => setAllowPermLuckChange(e.target.checked)} />} label="Allow Permanent Luck Changes" />
                </FormGroup>
            </Grid>
        </>)}


    </>)
}