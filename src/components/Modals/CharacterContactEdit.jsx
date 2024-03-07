import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
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

    const dispatch = useDispatch()

    // clearing out between contact edits / after saving new contact.
    // React.useEffect(() => {
    //     setNoteText(prop.notes)
    //     setLoyaltyAmount(prop.loyalty)
    // }, [notes])

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        dispatch({ type: 'CHARACTER_CONTACT_UPDATE', payload: { char_contact_id: prop.char_contact_id, charID: prop.char_id, loyalty: loyaltyAmount, notes: noteText, existingContact: prop } })
        setOpen(false);
    };

    const loyaltyAmountHandler = (newLoyalty) => {
        if (newLoyalty < 0) {
            newLoyalty = 0;
        } else if (newLoyalty > 9) {
            newLoyalty = 9;
        }
        setLoyaltyAmount(newLoyalty);
    }

    // const [loyaltyAmount, setLoyaltyAmount] = React.useState(prop.loyalty !== undefined ? prop.loyalty : 0);
    const [loyaltyAmount, setLoyaltyAmount] = React.useState(prop.loyalty);
    // const [noteText, setNoteText] = React.useState(prop.notes !== undefined ? prop.notes : '');
    const [noteText, setNoteText] = React.useState(prop.notes);

    return (
        <>
            <Button onClick={handleClickOpen('paper')} variant='contained'>{'Edit Contact'}</Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                scroll={scroll}
                fullWidth={true}
                maxWidth={'lg'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{prop.name}</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>

                    <Grid container alignItems={'center'}>
                        <Grid item xs={6} sx={{ border: 'gray', borderStyle: 'solid', backgroundColor: 'lightgray', color: 'black' }}
                            display={'flex'} alignItems={'center'} marginLeft={2} padding={1} >Connection: {prop.connection}</Grid>

                        <Grid item xs={1} marginLeft={1} padding={1}>Loyalty:</Grid>
                        <Grid item xs={4} padding={1}>
                            <TextField
                                fullWidth
                                onChange={e => loyaltyAmountHandler(e.target.value)}
                                required
                                type='number'
                                value={loyaltyAmount}
                                label='Loyalty'
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ border: 'gray', borderStyle: 'solid', backgroundColor: 'lightgray', color: 'black' }} marginRight={2} marginLeft={2} padding={1}>{prop.description}</Grid>

                        <Grid item xs={12} padding={2}>
                            <h3>My Notes:</h3>
                            <TextField
                                onChange={e => setNoteText(e.target.value)}
                                required
                                multiline
                                rows={8}
                                type='text'
                                value={noteText}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'center'}>
                        <Grid item xs={3} />
                        <Grid item xs={2} >
                            <Button fullWidth variant='contained' color='error' onClick={() => setOpen(false)}>Cancel</Button>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={2}>
                            <Button fullWidth variant='contained' color='primary' onClick={handleClose}>Save and Close</Button>
                        </Grid>
                        <Grid item xs={3} />
                    </Grid>
                </DialogActions>
            </Dialog>
        </>
    )
}
