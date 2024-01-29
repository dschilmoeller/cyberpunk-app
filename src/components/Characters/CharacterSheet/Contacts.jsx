import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Item from './Item';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CharacterContactEdit from '../../Modals/CharacterContactEdit';
import CharacterSheetHeaderDialog from '../../Modals/CharacterSheetHeaderDialog';

/* 
contacts - always display alphabetically. Display 2-3 per row; only show limited amount of the description if possible.
*/

export default function CharacterSheetContacts() {

    const charContacts = useSelector(store => store.characterContacts)
    const charDetailID = useSelector(store => store.characterDetail.id)

    return (
        <>
            <Grid item xs={12}>
                    <Item><CharacterSheetHeaderDialog prop={'Contacts'} /></Item>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    {charContacts.map(contact => {
                        return (
                            <React.Fragment key={contact.char_contact_id}>
                                <Grid item xs={6}>
                                    <Card>
                                        <CardHeader title={contact.name} />
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant='body1'>Connection: {contact.connection}</Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant='body1'>Loyalty: {contact.loyalty}</Typography>
                                                </Grid>
                                                <Grid item xs={12} marginTop={1}>
                                                    <Typography sx={{ whiteSpace: "pre-wrap" }} variant="body1">
                                                        {contact.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} marginTop={1}>
                                                    <Typography variant='body1'>
                                                        {contact.notes}
                                                    </Typography>
                                                </Grid>

                                            </Grid>
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