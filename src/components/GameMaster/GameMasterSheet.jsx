import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GameMasterMain from './GameMasterMain';
import GameMasterAttributes from './GameMasterAttributes';
import GameMasterSkills from './GameMasterSkills';
import GameMasterRoles from './GameMasterRoles';
import GameMasterOwnedGear from './GameMasterOwnedGear';
import GameMasterGiveGear from './GameMasterGiveGear';
import GameMasterCharContacts from './GameMasterCharContacts';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterSheet() {

    const [selectedSheet, setSelectedSheet] = useState('GM')
    const handleTabChange = (event, newValue) => {
        setSelectedSheet(newValue)
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const charDetail = useSelector(store => store.characterDetail)
    const equipmentDetails = useSelector(store => store.characterGear)
    const modDetails = useSelector(store => store.characterModMaster)
    const contacts = useSelector(store => store.characterContacts)

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    // State handlers for various fields
    const [handle, setHandle] = useState(charDetail.handle)
    const [player, setPlayer] = useState(charDetail.player)
    const [campaign, setCampaign] = useState(charDetail.campaign)

    const [allowDeleteCharacter, setAllowDeleteCharacter] = useState(false)

    useEffect(() => {
        // fetch initial details
        dispatch({ type: "FETCH_ADVANCEMENT_DETAIL", payload: params.id })
        // fetch character gear - using charDetail, so will continue using in play material.

        // fetch all master gear lists:
        dispatch({ type: "FETCH_MASTER_LISTS" })
        dispatch({ type: "FETCH_GM_SINGLE_CHAR_CONTACTS", payload: params.id })

        // required to make inputs default to existing data
        setHandle(charDetail.handle)
        setPlayer(charDetail.player)
        setCampaign(charDetail.campaign)
    }, [charDetail.id])

    // move handle, player, campaign to reducer.
    const saveCharacter = () => {
        dispatch({ type: "SAVE_GM_CHANGES", payload: { charDetail: charDetail, gear: equipmentDetails, mods: modDetails, handle: handle, player: player, campaign: campaign, contacts: contacts } })
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

        <Tabs
            value={selectedSheet}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='secondary'>
            {/* Humanity, Money, and Experience */}
            <Tab value='GM' label='GM Main' />
            {/* Atts, also Street Cred & Luck */}
            <Tab value='attributes' label='Attributes' />
            {/* Skills */}
            <Tab value='skills' label='Skills' />
            {/* Role abilities and skills, include manual IsParamedical */}
            <Tab value='role' label='Role' />
            {/* all owned gear, cyberware, netrunner, vehicles, etc. */}
            <Tab value='gear' label='Owned Gear' />
            {/* arbitrary giving of standard equipment */}
            <Tab value='gmGear' label='Give Gear' />
            {/* see contacts and edit loyalty */}
            <Tab value='gmCharContacts' label='Manage Contacts' />
        </Tabs>

        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}><h1>Character Details: </h1></Grid>
            <Grid item xs={6} paddingRight={3}>
                <Button fullWidth variant='contained' onClick={() => saveCharacter()}>Save Changes</Button>
            </Grid>
        </Grid>

        {selectedSheet === 'GM' ? (<>
            <GameMasterMain />
        </>) : <> </>}

        {selectedSheet === 'attributes' ? (<>
            <GameMasterAttributes />
        </>) : <> </>}

        {selectedSheet === 'skills' ? (<>
            <GameMasterSkills />
        </>) : <> </>}

        {selectedSheet === 'role' ? (<>
            <GameMasterRoles />
        </>) : <> </>}

        {selectedSheet === 'gear' ? (<>
            <GameMasterOwnedGear />
        </>) : <> </>}

        {selectedSheet === 'gmGear' ? (<>
            <GameMasterGiveGear />
        </>) : <> </>}

        {selectedSheet === 'gmCharContacts' ? (<>
            <GameMasterCharContacts />
        </>) : <> </>}

    </>)
}