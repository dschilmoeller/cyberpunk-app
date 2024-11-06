import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import GradeIcon from '@mui/icons-material/Grade';
import { Grid } from '@mui/material';

export default function CharacterNoteEdit({ prop }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [isNew, setIsNew] = React.useState(
    prop.title === undefined ? true : false
  );

  const [showRealDelete, setShowRealDelete] = React.useState(false);

  const dispatch = useDispatch();

  const notes = useSelector((store) => store.characterNotes);
  const loadStatus = useSelector((store) => store.loaders.inPlaySheet);

  // clearing out between notes / after saving new note.
  React.useEffect(() => {
    setTitleText(prop.title !== undefined ? prop.title : '');
    setBodyText(prop.body !== undefined ? prop.body : '');
  }, [notes]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    setShowRealDelete(false);
  };

  const handleClose = () => {
    setShowRealDelete(false);
    if (isNew === false) {
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
      dispatch({
        type: 'CHARACTER_NOTE_UPDATE',
        payload: {
          title: titleText,
          body: bodyText,
          id: prop.char_note_id,
          charID: prop.char_id,
          favorite: favoriteStatus,
        },
      });
      setOpen(false);
    } else {
      dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
      dispatch({
        type: 'CHARACTER_NEW_NOTE',
        payload: {
          title: titleText,
          body: bodyText,
          charID: prop,
          favorite: favoriteStatus,
        },
      });
      setOpen(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    setShowRealDelete(false);
  };
  const handleDelete = () => {
    setShowRealDelete(true);
  };
  const actuallyDelete = () => {
    dispatch({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: true });
    dispatch({
      type: 'CHARACTER_DELETE_NOTE',
      payload: { noteID: prop.char_note_id, charID: prop.char_id },
    });
    setOpen(false);
  };

  const favoriteNote = () => {
    setFavoriteStatus(!favoriteStatus);
  };

  const [titleText, setTitleText] = React.useState(
    prop.title !== undefined ? prop.title : ''
  );
  const [bodyText, setBodyText] = React.useState(
    prop.body !== undefined ? prop.body : ''
  );
  const [favoriteStatus, setFavoriteStatus] = React.useState(prop.favorite);

  return (
    <>
      <Button onClick={handleClickOpen('paper')} variant="contained">
        {prop.title !== undefined ? 'Edit Note' : 'New Note'}
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
            onClick={actuallyDelete}
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
              <TextField
                onChange={(e) => setTitleText(e.target.value)}
                required
                type="text"
                value={titleText}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} padding={2}>
              Body:
              <TextField
                onChange={(e) => setBodyText(e.target.value)}
                required
                multiline
                rows={8}
                type="text"
                value={bodyText}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justifyContent={'center'}>
            {titleText === '' || bodyText === '' ? (
              <>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Grid item>
                  {showRealDelete ? (
                    <>
                      <Button color="error" variant="contained">
                        Garbage Can In Top Right
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete()}
                      >
                        Delete Note
                      </Button>
                    </>
                  )}
                </Grid>
              </>
            )}
            <Grid item paddingLeft={1}>
              <Button variant="contained" onClick={() => handleClose()}>
                Save and Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
