import React from 'react';
import Grid from '@mui/material/Grid';

import Health from './Health';
import Humanity from './Humanity';
import Luck from './Luck';
import Armor from './Armor';

function CharacterMarkers(charDetailProp) {
  const charDetail = charDetailProp.charDetail;

  return (
    <>
      <Health />
      <Grid item xs={4}>
        <Armor charDetailProp={charDetail} />
        <Luck charDetailProp={charDetail} />
        <Humanity charDetailProp={charDetail} />
      </Grid>
    </>
  );
}

export default CharacterMarkers;
