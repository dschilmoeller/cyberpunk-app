import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function GameMasterCharContacts() {
  const characterContacts = useSelector((store) => store.characterContacts);
  const charDetail = useSelector((store) => store.advancementDetail);

  const dispatch = useDispatch();

  const changeLoyalty = (currentAmount, changeType, contactID) => {
    switch (changeType) {
      case 'reduce':
        if (currentAmount - 1 >= 0) {
          dispatch({
            type: 'GM_REDUCE_LOYALTY',
            payload: { newAmount: currentAmount - 1, contactID: contactID },
          });
        } else {
          console.log(`Cannot reduce below 0`);
        }
        break;
      case 'increase':
        if (currentAmount + 1 < 10) {
          dispatch({
            type: 'GM_INCREASE_LOYALTY',
            payload: { newAmount: currentAmount + 1, contactID: contactID },
          });
        } else {
          console.log(`Cannot increase above 9`);
        }
        break;
    }
  };

  return (
    <>
      <Grid container>
        {characterContacts.map((contact) => {
          return (
            <React.Fragment key={contact.char_contact_id}>
              <Grid
                item
                xs={5.75}
                marginLeft={2.5}
                marginBottom={1}
                padding={1}
                border={'solid gray'}
              >
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
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() =>
                        changeLoyalty(
                          contact.loyalty,
                          'reduce',
                          contact.char_contact_id
                        )
                      }
                    >
                      Reduce Loyalty
                    </Button>
                  </Grid>
                  <Grid item xs={5} margin={1}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      onClick={() =>
                        changeLoyalty(
                          contact.loyalty,
                          'increase',
                          contact.char_contact_id
                        )
                      }
                    >
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
