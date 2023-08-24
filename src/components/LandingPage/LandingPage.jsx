import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Grid, Button } from '@mui/material';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <Grid container spacing={3} padding={5}>
        <Grid item xs={6}>
          Welcome to The Cyberpumpkin App. Please start by Registering or Logging In. Cyberpumpkin is an immersive role playing experience, and this version has been adapted to the D10 system (similar to e.g. World of Darkness) and dramatically simplified for newer players. This website should contain everything you need to get started. Every effort has been made to ensure that clicking through text will pop up some relevant information. Of course, there's always the rule section to fall back on as well (available once you've logged in).
        </Grid>

        <Grid item xs={6}>
          <RegisterForm />
        </Grid>
      </Grid>


      <Grid container>
        <Grid item display={'flex'} justifyContent={'center'} xs={12}>

          <h4>Already a Member?</h4>

          <Button className="btn btn_sizeSm" onClick={onLogin}>Login</Button>

        </Grid>
      </Grid>
    </>
  );
}

export default LandingPage;
