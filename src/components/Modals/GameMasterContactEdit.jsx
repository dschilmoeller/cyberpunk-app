import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function GameMasterContactEdit({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const campaignList = useSelector(store => store.campaigns)
    const characterList = useSelector(store => store.characterList)
    const contactBridge = useSelector(store => store.contactBridge)

    const [nameText, setNameText] = React.useState(prop == 'new' ? '' : prop.name)
    const [descText, setDescText] = React.useState(prop == 'new' ? '' : prop.description)
    const [connectionAmount, setConnectionAmount] = React.useState(prop == 'new' ? 0 : prop.connection)

    const [campaign, setCampaign] = React.useState(prop == 'new' ? 0 : prop.campaign_id)
    const [campaignName, setCampaignName] = React.useState('')

    const [characterID, setCharacterID] = React.useState(0)

    const [snackBarAlertText, setSnackBarAlertText] = React.useState('')

    const dispatch = useDispatch()

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });


    // clearing out between notes / after saving new note.
    React.useEffect(() => {
        setCampaignName(prop.campaign_name)
        // setNameText(prop == 'new' ? '' : prop.name)
        // setDescText(prop == 'new' ? '' : prop.description)
        // setIsNew(prop = 'new' ? true : false)
    }, [])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleConnection = (newAmount) => {
        if (newAmount <= 0) {
            setConnectionAmount(0)
        } else if (newAmount > 9) {
            setConnectionAmount(9)
        } else {
            setConnectionAmount(newAmount)
        }
    }

    const handleClose = () => {
        if (nameText.length > 0 && descText.length > 0 && connectionAmount > 0) {
            if (campaign != 0) {
                if (prop === 'new') {
                    dispatch({ type: 'GM_CREATE_CONTACT', payload: { name: nameText, connection: connectionAmount, description: descText, campaign_id: campaign } })
                    setOpen(false);
                } else {
                    dispatch({ type: 'SAVE_GM_CONTACT', payload: { contact_master_id: prop.contact_master_id, name: nameText, connection: connectionAmount, description: descText, campaign_id: campaign } })
                    setOpen(false);
                }
            } else {
                setSnackBarAlertText('Select campaign to proceed.')
                setShowSnackbar(true)
            }
        } else {
            setSnackBarAlertText('Please fill out all fields to save')
            setShowSnackbar(true)
        }
    };

    const handleDelete = () => {
        dispatch({ type: 'GM_DELETE_CONTACT', payload: prop.contact_master_id })
        setOpen(false)
    }

    const changeCampaign = (value) => {
        if (value == 0) {
            setCampaignName('All Campaigns')
            setCampaign(value)
        } else {
            campaignList.map(campaign => {
                {
                    if (value == campaign.campaign_id) {
                        setCampaignName(campaign.campaign_name)
                    }
                    setCampaign(value)
                }
            })
        }
    }

    const assignContactAllChars = () => {
        if (campaign == 0) {
            setSnackBarAlertText('Select campaign to assign contact to characters.')
            setShowSnackbar(true)
        } else {
            characterList.map(character => {
                if (character.campaign === campaign) {
                    let contactExists = false;
                    for (let i = 0; i < contactBridge.length; i++) {
                        if (character.id === contactBridge[i].char_id && prop.contact_master_id === contactBridge[i].contact_id) {
                            contactExists = true;
                            return;
                        }
                    }
                    // If contact does not yet exist in the table.
                    if (contactExists === false) {
                        dispatch({ type: "ASSIGN_CONTACT_CAMPAIGN_CHARS", payload: { contactID: prop.contact_master_id, characterID: character.id } })
                    }
                }
            })
            setOpen(false)
        }
    }

    const assignContactSingleChar = (character) => {
        if (character == 0) {
            setSnackBarAlertText('Select character to assign contact.')
            setShowSnackbar(true)
        } else {
            let contactExists = false;
            for (let i = 0; i < contactBridge.length; i++) {
                if (character === contactBridge[i].char_id && prop.contact_master_id === contactBridge[i].contact_id) {
                    setSnackBarAlertText('Character already has contact.')
                    setShowSnackbar(true)
                    contactExists = true;
                    return;
                }
            }
            // if contact does not currently exist
            if (contactExists === false) {
                dispatch({ type: "ASSIGN_CONTACT_CAMPAIGN_CHARS", payload: { contactID: prop.contact_master_id, characterID: character } })
            }
            setOpen(false)
        }
    }

    return (
        <>
            <Snackbar
                TransitionComponent={TransitionUp}
                autoHideDuration={2000}
                open={showSnackbar}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                    {snackBarAlertText}
                </Alert>
            </Snackbar>

            <Button onClick={handleClickOpen('paper')} variant='contained'>{prop == 'new' ? 'New Contact' : 'Edit Contact'}</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                scroll={scroll}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {prop == 'new' ? <DialogTitle id="scroll-dialog-title">New Contact</DialogTitle>
                    : <DialogTitle id="scroll-dialog-title">Edit Contact</DialogTitle>}

                {prop == 'new' ? <></>
                    : <Button
                        variant='contained'
                        color='error'
                        aria-label="favorite"
                        onClick={() => handleDelete()}
                        sx={{
                            position: 'absolute',
                            right: 50,
                            top: 8,
                        }}
                    >
                        Delete Contact
                    </Button>}

                <DialogContent dividers={scroll === 'paper'}>

                    <Grid container>
                        <Grid item xs={12} padding={2}>
                            Name:
                            <TextField
                                onChange={e => setNameText(e.target.value)}
                                required
                                type='text'
                                value={nameText}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} padding={2}>
                            <Select
                                value={campaign}
                                fullWidth
                                onChange={e => changeCampaign(e.target.value)}>
                                {<MenuItem key={0} value={0}>Select Campaign to assign Contact into</MenuItem>}
                                {campaignList.map(campaign => {
                                    return <MenuItem key={campaign.campaign_id} value={campaign.campaign_id}>{campaign.campaign_name}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={12} padding={2}>
                            <TextField
                                fullWidth
                                onChange={e => handleConnection(e.target.value)}
                                required
                                type='number'
                                value={connectionAmount}
                                label='Connection'
                            />
                        </Grid>
                        <Grid item xs={12} padding={2}>
                            Description:
                            <TextField
                                onChange={e => setDescText(e.target.value)}
                                required
                                multiline
                                rows={1}
                                type='text'
                                value={descText}
                                fullWidth
                            />
                        </Grid>
                        {prop.campaign_id > 0 ? (
                            <>
                                <Grid item xs={6} padding={2} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    Selected Campaign: {campaignName}
                                </Grid>
                                <Grid item xs={6} padding={2}>
                                    <Button sx={{ padding: 3 }} fullWidth variant='contained' color='success' onClick={() => assignContactAllChars(campaign)}>Assign to all Characters in campaign</Button>
                                </Grid>
                                <Grid item xs={6} padding={2}>
                                    <Select
                                        value={characterID}
                                        fullWidth
                                        onChange={e => setCharacterID(e.target.value)}
                                    >
                                        <MenuItem key={0} value={0}>Select Character</MenuItem>
                                        {characterList.map(char => {
                                            return <MenuItem key={char.id} value={char.id}>{char.handle}</MenuItem>
                                        })}
                                    </Select>
                                </Grid>
                                <Grid item xs={6} padding={2}>
                                    <Button sx={{ padding: 3 }} fullWidth variant='contained' color='success' onClick={() => assignContactSingleChar(characterID)}>Assign to individual character</Button>
                                </Grid>
                            </>) : <></>}

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={12} paddingRight={1} display={'flex'} justifyContent={'flex-end'}>
                            <Button variant='contained' onClick={() => handleClose(false)}>Save and Close</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}
