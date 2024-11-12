import React from 'react';
import Grid from '@mui/material/Grid';

import Health from './MarkerComponents/Health';
import Humanity from './Humanity';
import Luck from './Luck';
import Armor from './MarkerComponents/Armor';

function CharacterMarkers({ charDetail, charStatus, setCharStatus, charCyberware, loading, setLoading, chuckError, setPageAlert }) {
  return (
    <>
      <Health
        charDetail={charDetail}
        charStatus={charStatus}
        setCharStatus={setCharStatus}
        characterCyberware={charCyberware}
        loading={loading}
        setLoading={setLoading}
        chuckError={chuckError}
      />
      <Grid item xs={4}>
        <Armor
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          chuckError={chuckError}
          setPageAlert={setPageAlert}
        />
        <Luck
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          chuckError={chuckError}
          setPageAlert={setPageAlert}
        />
        {/* <Humanity charDetail={charDetail} charStatus={charStatus} /> */}
      </Grid>
    </>
  );
}

export default CharacterMarkers;
