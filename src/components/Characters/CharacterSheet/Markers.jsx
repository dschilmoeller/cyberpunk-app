import React from 'react';
import Grid from '@mui/material/Grid';

import Health from './MarkerComponents/Health';
import Humanity from './MarkerComponents/Humanity';
import Luck from './MarkerComponents/Luck';
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
        <Humanity
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          chuckError={chuckError}
          setPageAlert={setPageAlert}
        />
      </Grid>
    </>
  );
}

export default CharacterMarkers;
