import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '../Item';
import OtherAttributesDialog from '../../../Modals/OtherAttributesDialog';

function Humanity({ charDetail }) {
  const temp_humanity_loss = charDetail.temp_humanity_loss;
  const perm_humanity_loss = charDetail.perm_humanity_loss;

  return (
    <>
      <Item>
        <OtherAttributesDialog prop={'Humanity'} />
      </Item>
      <Grid container>
        <Grid item xs={12}>
          <Item sx={{ color: 'white' }}>Current Humanity: {40 - (temp_humanity_loss + perm_humanity_loss)} / 40</Item>
        </Grid>
      </Grid>
    </>
  );
}

export default Humanity;
