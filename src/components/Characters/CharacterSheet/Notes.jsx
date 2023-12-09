import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CharacterNoteEdit from '../../Modals/CharacterNoteEdit';

export default function CharacterSheetNotes() {

    const charNotes = useSelector(store => store.characterNotes)
    const charDetailID = useSelector(store => store.characterDetail.id)

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                    <CharacterNoteEdit prop={charDetailID} />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    {charNotes.map(note => {
                        return (
                            <React.Fragment key={note.char_note_id}>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {note.title}
                                            </Typography>
                                            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
                                                {note.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container justifyContent={'center'}>
                                            <CharacterNoteEdit prop={note} />
                                            </Grid>
                                            
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
            </Grid>
        </>
    )
}