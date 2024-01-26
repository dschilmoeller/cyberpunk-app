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

import CharacterContactEdit from '../../Modals/CharacterContactEdit';

/* 
contacts - always display alphabetically. Display 2-3 per row; only show limited amount of the description if possible.
*/

export default function CharacterSheetContacts() {

    const charContacts = useSelector(store => store.characterContacts)
    const charDetailID = useSelector(store => store.characterDetail.id)

    return (
        <>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={6} display={'flex'} justifyContent={'center'}>
                        <CharacterContactEdit prop={charDetailID} />
                    </Grid>
                    <Grid item xs={3}></Grid>
                    {charContacts.map(contact => {
                        return (
                            <React.Fragment key={contact.char_contact_id}>
                                <Grid item xs={6}>
                                    <Card>
                                        {contact.favorite == true ? (
                                            <CardHeader
                                                action={
                                                    <Icon aria-label="settings">
                                                        <GradeIcon sx={{
                                                            color: contact.favorite ? 'yellow' : 'white'
                                                        }} />
                                                    </Icon>
                                                }
                                                title={contact.title} />
                                        ) : <CardHeader
                                            title={contact.title} />}
                                        <CardContent>
                                            <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body2">
                                                {contact.body}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container justifyContent={'center'}>
                                                <CharacterContactEdit prop={contact} />
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