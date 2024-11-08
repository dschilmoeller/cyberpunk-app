import React from 'react';
import { Button, Grid } from '@mui/material';
import { fetchCharacterContactsRequest, changeContactLoyaltyRequest } from './gm.services';

export default function GameMasterCharContacts({ charDetail, characterContacts, setPageAlert, loading, setLoading, chuckError, setCharContacts }) {
  const changeLoyalty = async (contact, change) => {
    setLoading(true);
    if (contact.loyalty + change >= 0 && contact.loyalty + change <= 10) {
      try {
        const contactObj = {
          loyalty: contact.loyalty + change,
          contactID: contact.char_contact_id,
        };
        let result = await changeContactLoyaltyRequest(contactObj);
        if (result === 'OK') {
          let charContacts = await fetchCharacterContactsRequest(charDetail.id);
          setCharContacts(charContacts);
          setPageAlert({
            open: true,
            message: 'Success',
            severity: 'success',
          });
        }
      } catch (error) {
        console.error('error changing contact loyalty:', error);
        chuckError();
      }
    } else {
      setPageAlert({
        open: true,
        message: 'Change is beyond limits',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container>
        {characterContacts.map((contact) => {
          return (
            <React.Fragment key={contact.char_contact_id}>
              <Grid item xs={5.75} marginLeft={2.5} marginBottom={1} padding={1} border={'solid gray'}>
                <Grid container>
                  <Grid item xs={12}>
                    Name: {contact.name}
                  </Grid>
                  <Grid item xs={12}>
                    Connection: {contact.connection}
                  </Grid>
                  <Grid item xs={12}>
                    Description: {contact.description}
                  </Grid>
                  <Grid item xs={12}>
                    Loyalty: {contact.loyalty}
                  </Grid>
                  <Grid item xs={5} margin={1}>
                    <Button disabled={loading} fullWidth variant="contained" color="error" onClick={() => changeLoyalty(contact, -1)}>
                      Reduce Loyalty
                    </Button>
                  </Grid>
                  <Grid item xs={5} margin={1}>
                    <Button disabled={loading} fullWidth variant="contained" color="success" onClick={() => changeLoyalty(contact, 1)}>
                      Increase Loyalty
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
