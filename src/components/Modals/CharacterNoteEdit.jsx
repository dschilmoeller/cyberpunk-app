import * as React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';
import { inPlayNoteCreate, inPlayNoteEdit, inPlayNoteDelete, fetchInPlayCharacterNotesRequest } from '../Characters/character.services';

// TODO TESTING New note doesn't work, nothing checked.
export default function CharacterNoteEdit({ note, isNew, charID, loading, setLoading, chuckError, setPageAlert, setCharNotes }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [showRealDelete, setShowRealDelete] = React.useState(false);

  const handleClose = async () => {
    setLoading(true);
    const noteObj = {
      char_note_id: isNew ? 0 : note.char_note_id,
      charID,
      title: titleText,
      body: bodyText,
      favorite: favoriteStatus,
    };
    try {
      if (isNew === true) {
        let result = await inPlayNoteCreate(noteObj);
        if (result === 'OK') {
          setPageAlert({ open: true, message: 'Note Created', severity: 'success' });
          let refetchNotes = await fetchInPlayCharacterNotesRequest(noteObj);
          setCharNotes(refetchNotes);
        } else {
          chuckError();
        }
      } else if (isNew === false) {
        let result = await inPlayNoteEdit(noteObj);
        if (result === 'OK') {
          setPageAlert({ open: true, message: 'Note Saved', severity: 'success' });
          let refetchNotes = await fetchInPlayCharacterNotesRequest(noteObj);
          setCharNotes(refetchNotes);
        } else {
          chuckError();
        }
      }
    } catch (error) {
      console.error('Error creating or editing note:', error);
      chuckError();
    }
    setOpen(false);
    setLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setShowRealDelete(false);
  };

  const handleDelete = () => {
    setShowRealDelete(true);
  };

  const handleActuallyDelete = async () => {
    setLoading(true);
    const noteObj = {
      char_note_id: note.char_note_id,
      charID,
    };
    try {
      let result = await inPlayNoteDelete(noteObj);
      if (result === 'OK') {
        setPageAlert({ open: true, message: 'Note deleted', severity: 'success' });
        let refetchNotes = await fetchInPlayCharacterNotesRequest(noteObj);
        setCharNotes(refetchNotes);
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      chuckError();
    }
    setOpen(false);
    setLoading(false);
  };

  const favoriteNote = () => {
    setFavoriteStatus(!favoriteStatus);
  };

  const [titleText, setTitleText] = React.useState('');
  const [bodyText, setBodyText] = React.useState('');
  const [favoriteStatus, setFavoriteStatus] = React.useState(false);

  // clearing out between notes / after saving new note.
  React.useEffect(() => {
    setTitleText(isNew ? '' : note.title);
    setBodyText(isNew ? '' : note.body);
    setFavoriteStatus(isNew ? false : note.favorite);
  }, []);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    setShowRealDelete(false);
  };

  return (
    <>
      <Button disabled={loading} onClick={handleClickOpen('paper')} variant="contained">
        {isNew ? 'New Note' : 'Edit Note'}
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        scroll={scroll}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Edit Note</DialogTitle>
        <IconButton
          aria-label="favorite"
          onClick={favoriteNote}
          disabled={loading}
          sx={{
            position: 'absolute',
            right: 50,
            top: 8,
            color: favoriteStatus ? 'yellow' : 'white',
          }}
        >
          <GradeIcon />
        </IconButton>
        {showRealDelete ? (
          <IconButton
            aria-label="close"
            onClick={handleActuallyDelete}
            disabled={loading}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        ) : (
          <></>
        )}
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container>
            <Grid item xs={12} padding={2}>
              Title:
              <TextField onChange={(e) => setTitleText(e.target.value)} required type="text" value={titleText} fullWidth />
            </Grid>
            <Grid item xs={12} padding={2}>
              Body:
              <TextField onChange={(e) => setBodyText(e.target.value)} required multiline rows={8} type="text" value={bodyText} fullWidth />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={'center'}>
            {titleText === '' || bodyText === '' ? (
              <>
                <Button disabled={loading} variant="contained" color="error" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Grid item>
                  {showRealDelete ? (
                    <>
                      <Button disabled={loading} color="error" variant="contained">
                        Garbage Can In Top Right
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button disabled={loading} color="error" variant="contained" onClick={() => handleDelete()}>
                        Delete Note
                      </Button>
                    </>
                  )}
                </Grid>
              </>
            )}
            <Grid item paddingLeft={1}>
              <Button disabled={loading} variant="contained" onClick={() => handleClose()}>
                Save and Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
