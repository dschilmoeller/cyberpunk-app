import React from 'react';
import { Grid, Button } from '@mui/material';

function AboutPage() {
  return (
    <>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>This page was created by David Schilmoeller in 2023. After finishing an intensive boot camp, he thought he would bang out a quick bit of software to help him spend time with his friends. Stop if you've heard this story - it got way out of hand and now is this monument to dorkiness.</Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid paddingTop={2} item xs={6}>If you'd like to get a hold of the creator for some reason, please reach out at:</Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6}>
          <a href='https://linkedin.com/in/schilmoeller' target='_blank'>LinkedIn: linkedin.com/in/schilmoeller</a>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6}><a href='mailto: dave.schilmoeller@gmail.com'>Email: dave.schilmoeller@gmail.com</a>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutPage;
