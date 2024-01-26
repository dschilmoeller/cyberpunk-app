import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';
import { Grid } from '@mui/material';

/* contact parts =
Name
Loyalty
Connection
Description
*/

// number inputs require validation function to get rid of -, + non-number entries. 

export default function CharacterContactEdit({ prop }) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const [isNew, setIsNew] = React.useState(prop.title === undefined ? true : false)

    const [showRealDelete, setShowRealDelete] = React.useState(false);

    const dispatch = useDispatch()

    const notes = useSelector(store => store.characterNotes)

    // clearing out between contact edits / after saving new contact.
    React.useEffect(() => {
        setNameText(prop.name !== undefined ? prop.name : '')
        setDescriptionText(prop.description !== undefined ? prop.description : '')
    }, [notes])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        setShowRealDelete(false)
    };

    const handleClose = () => {
        setShowRealDelete(false)
        if (isNew === false) {
            dispatch({ type: 'CHARACTER_CONTACT_UPDATE', payload: { name: nameText, connection: connectionAmount, loyalty: loyaltyAmount, description: descriptionText, id: prop.char_contact_id, char_id: prop.char_id } })
            setOpen(false);
        } else {
            dispatch({ type: 'CHARACTER_NEW_CONTACT', payload: { name: nameText, connection: connectionAmount, loyalty: loyaltyAmount, description: descriptionText, char_id: prop } })
            setOpen(false);
        }
    };

    const handleCancel = () => {
        setOpen(false)
        setShowRealDelete(false)
    }
    const handleDelete = () => {
        setShowRealDelete(true)
    }
    const actuallyDelete = () => {
        dispatch({ type: 'CHARACTER_DELETE_NOTE', payload: prop.char_note_id })
        setOpen(false)
    }

    const favoriteNote = () => {
        setFavoriteStatus(!favoriteStatus)
    }

    const [nameText, setNameText] = React.useState(prop.title !== undefined ? prop.title : '');
    const [connectionAmount, setConnectionAmount] = React.useState(prop.connection !== undefined ? prop.connection : 0);
    const [loyaltyAmount, setLoyaltyAmount] = React.useState(prop.loyalty !== undefined ? prop.loyalty : 0);
    const [descriptionText, setDescriptionText] = React.useState(prop.description !== undefined ? prop.description : '');

    return (
        <>
            <Button onClick={handleClickOpen('paper')} variant='contained'>{prop.title !== undefined ? 'Edit Contact' : 'New Contact'}</Button>
            <Dialog
                open={open}
                onClose={handleCancel}
                scroll={scroll}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Edit Contact</DialogTitle>

                {showRealDelete ? <IconButton
                    aria-label="close"
                    onClick={actuallyDelete}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <DeleteIcon color='error' />
                </IconButton> : <></>}
                <DialogContent dividers={scroll === 'paper'}>

                    <Grid container alignItems={'center'}>
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
                        <Grid item xs={1} paddingLeft={2} paddingBottom={2}>Connection</Grid>
                        <Grid item xs={5} paddingLeft={2} paddingBottom={2}>
                            <TextField
                                onChange={e => setConnectionAmount(e.target.value)}
                                required
                                type='number'
                                value={connectionAmount}
                                label='Connection'
                            />
                        </Grid>

                        <Grid item xs={1} paddingLeft={2} paddingBottom={2}>Loyalty</Grid>
                        <Grid item xs={5} paddingLeft={2} paddingBottom={2}>
                            <TextField
                                fullWidth
                                onChange={e => setConnectionAmount(e.target.value)}
                                required
                                type='number'
                                value={connectionAmount}
                                label='Connection'
                            />
                        </Grid>
                        <Grid item xs={12} padding={2}>
                            Description:
                            <TextField
                                onChange={e => setDescriptionText(e.target.value)}
                                required
                                multiline
                                rows={8}
                                type='text'
                                value={descriptionText}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'center'}>
                        <Grid item paddingRight={1}>
                            <Button variant='contained' onClick={handleClose}>Save and Close</Button>
                        </Grid>
                        <Grid item>
                            {showRealDelete ? (<>
                                <Button color='error' variant='contained'>Garbage Can In Top Right</Button>
                            </>) : <>
                                <Button color='error' onClick={handleDelete}>Delete Note</Button>
                            </>}
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}
