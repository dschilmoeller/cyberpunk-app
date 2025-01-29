import * as React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { inPlayContactEdit, fetchInPlayContactsRequest } from '../../../../services/CharInPlay.services';

export default function CharacterContactEdit({ charDetail, contact, setCharContacts, loading, setLoading, chuckError, setPageAlert }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = async () => {
    setLoading(true);
    const contactObj = {
      charID: charDetail.id,
      char_contact_id: contact.char_contact_id,
      loyalty: loyaltyAmount,
      notes: noteText,
    };
    try {
      let result = await inPlayContactEdit(contactObj);
      if (result === 'OK') {
        setPageAlert({ open: true, message: 'Contact Updated', severity: 'success' });
        let refetchContacts = await fetchInPlayContactsRequest(contactObj);
        setCharContacts(refetchContacts);
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      chuckError();
    }
    setLoading(false);
    setOpen(false);
  };

  const loyaltyAmountHandler = (newLoyalty) => {
    if (newLoyalty < 0) {
      newLoyalty = 0;
    } else if (newLoyalty > 9) {
      newLoyalty = 9;
    }
    setLoyaltyAmount(newLoyalty);
  };

  const [loyaltyAmount, setLoyaltyAmount] = React.useState(contact.loyalty);
  const [noteText, setNoteText] = React.useState(contact.notes);

  return (
    <>
      <Button onClick={handleClickOpen('paper')} disabled={loading} variant="contained">
        {'Edit Contact'}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll={scroll}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{contact.name}</DialogTitle>

        <DialogContent dividers={scroll === 'paper'}>
          <Grid container alignItems={'center'}>
            <Grid
              item
              xs={6}
              sx={{
                border: 'gray',
                borderStyle: 'solid',
                backgroundColor: 'lightgray',
                color: 'black',
              }}
              display={'flex'}
              alignItems={'center'}
              marginLeft={2}
              padding={1}
            >
              Connection: {contact.connection}
            </Grid>

            <Grid item xs={1} marginLeft={1} padding={1}>
              Loyalty:
            </Grid>
            <Grid item xs={4} padding={1}>
              <TextField
                fullWidth
                onChange={(e) => loyaltyAmountHandler(e.target.value)}
                required
                type="number"
                value={loyaltyAmount}
                label="Loyalty"
              />
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                border: 'gray',
                borderStyle: 'solid',
                backgroundColor: 'lightgray',
                color: 'black',
              }}
              marginRight={2}
              marginLeft={2}
              padding={1}
            >
              {contact.description}
            </Grid>

            <Grid item xs={12} padding={2}>
              <h3>My Notes:</h3>
              <TextField onChange={(e) => setNoteText(e.target.value)} required multiline rows={8} type="text" value={noteText} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={'center'}>
            <Grid item xs={3} />
            <Grid item xs={2}>
              <Button fullWidth disabled={loading} variant="contained" color="error" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={2}>
              <Button fullWidth disabled={loading} variant="contained" color="primary" onClick={handleClose}>
                Save and Close
              </Button>
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
