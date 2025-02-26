import * as React from 'react';
import Item from './Item';
import { Grid, Card, CardHeader, CardActions, CardContent, Typography } from '@mui/material/';

import CharacterContactEdit from './Modals/CharacterContactEdit';
import CharacterSheetHeaderDialog from './Modals/CharacterSheetHeaderDialog';

export default function CharacterSheetContacts({ charDetail, charContacts, setCharContacts, loading, setLoading, setPageAlert }) {
  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={1}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Contacts'} />
          </Item>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {charContacts.map((contact) => {
            return (
              <React.Fragment key={contact.char_contact_id}>
                <Grid item xs={6}>
                  <Card>
                    <CardHeader title={contact.name} />
                    <CardContent>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography variant="body1">Connection: {contact.connection}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Loyalty: {contact.loyalty}</Typography>
                        </Grid>
                        <Grid item xs={12} marginTop={1}>
                          <Typography sx={{ whiteSpace: 'pre-wrap' }} variant="body1">
                            {contact.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} marginTop={1}>
                          <Typography variant="body1">{contact.notes}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Grid container justifyContent={'center'}>
                        <CharacterContactEdit
                          charDetail={charDetail}
                          contact={contact}
                          setCharContacts={setCharContacts}
                          loading={loading}
                          setLoading={setLoading}
                          setPageAlert={setPageAlert}
                        />
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
