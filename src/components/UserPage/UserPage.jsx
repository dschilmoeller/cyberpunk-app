import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@mui/material';


function UserPage() {

  const user = useSelector((store) => store.user);
  const history = useHistory();

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
