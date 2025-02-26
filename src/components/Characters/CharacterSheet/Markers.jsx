import React from 'react';
import Grid from '@mui/material/Grid';

import Health from './MarkerComponents/Health';
import Humanity from './MarkerComponents/Humanity';
import Luck from './MarkerComponents/Luck';
import Armor from './MarkerComponents/Armor';

function CharacterMarkers({ charDetail, charStatus, setCharStatus, charCyberware, loading, setLoading, setPageAlert }) {
  return (
    <>
      <Health
        charDetail={charDetail}
        charStatus={charStatus}
        setCharStatus={setCharStatus}
        characterCyberware={charCyberware}
        loading={loading}
        setLoading={setLoading}
        setPageAlert={setPageAlert}
      />
      <Grid item xs={4}>
        <Armor
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          setPageAlert={setPageAlert}
        />
        <Luck
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          setPageAlert={setPageAlert}
        />
        <Humanity
          charDetail={charDetail}
          charStatus={charStatus}
          setCharStatus={setCharStatus}
          loading={loading}
          setLoading={setLoading}
          setPageAlert={setPageAlert}
        />
      </Grid>
    </>
  );
}

export default CharacterMarkers;
