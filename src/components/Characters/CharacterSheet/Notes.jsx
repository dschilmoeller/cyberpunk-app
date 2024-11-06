import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Icon } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';

import CharacterNoteEdit from '../../Modals/CharacterNoteEdit';
import Item from './Item';
import CharacterSheetHeaderDialog from '../../Modals/CharacterSheetHeaderDialog';

export default function CharacterSheetNotes() {
  const charNotes = useSelector((store) => store.characterNotes);
  const charDetailID = useSelector((store) => store.characterDetail.id);

  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={2}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Notes'} />
          </Item>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6} display={'flex'} justifyContent={'center'}>
            <CharacterNoteEdit prop={charDetailID} />
          </Grid>
          <Grid item xs={3}></Grid>
          {charNotes.map((note) => {
            return (
              <React.Fragment key={note.char_note_id}>
                <Grid item xs={6}>
                  <Card>
                    {note.favorite == true ? (
                      <CardHeader
                        action={
                          <Icon aria-label="settings">
                            <GradeIcon
                              sx={{
                                color: note.favorite ? 'yellow' : 'white',
                              }}
                            />
                          </Icon>
                        }
                        title={note.title}
                      />
                    ) : (
                      <CardHeader title={note.title} />
                    )}
                    <CardContent>
                      <Typography
                        sx={{ whiteSpace: 'pre-wrap' }}
                        variant="body2"
                      >
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
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
