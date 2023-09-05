import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@mui/material';


function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(()=> {
    dispatch({ type: 'CLEAR_ADVANCEMENT_DETAIL' });
    dispatch({ type: 'CLEAR_VEHICLE_MODS' });
    dispatch({ type: 'CLEAR_CREATION_DETAILS' });
    dispatch({ type: 'CLEAR_CHARACTER_DETAIL'});
    dispatch({ type: 'CLEAR_CHARACTER_CYBER_DETAILS'});
    dispatch({ type: 'CLEAR_CHARACTER_NETRUNNER_GEAR'});
    dispatch({ type: 'CLEAR_CHARACTER_VEHICLES'});
    dispatch({ type: 'CLEAR_CHARACTER_STATUS'});
    dispatch({ type: 'CLEAR_CHARACTER_WEAPONS'});
  })
  
  return (
    <>

      <Grid container flexDirection={'column'} alignContent={'center'} >
        <Button sx={{ margin: 2 }} variant='contained' onClick={() => history.push('/characterlist')}>See Existing Characters</Button>
        <br />
        <Button sx={{ margin: 2 }} variant='contained' onClick={() => history.push('/charcreation/')}>Create New Character</Button>
        <br />

      </Grid>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
