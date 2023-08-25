import React from 'react';
import { Grid, Link } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
function AboutPage() {
  return (
    <>
      <Grid container spacing={1} >
        <Grid item xs={3} />
        <Grid item xs={6}>This page was created by David Schilmoeller in 2023. After finishing an intensive boot camp, he thought he would bang out a quick bit of software to help him spend time with his friends. Stop if you've heard this story - it got way out of hand and now is this monument to dorkiness.</Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid paddingTop={2} item xs={6}>If you'd like to get a hold of the creator for some reason, please reach out at:</Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6} display={'flex'}>
          <LinkedInIcon />
          <Link href='https://linkedin.com/in/schilmoeller' target='_blank'>
            LinkedIn
          </Link>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6} display={'flex'}>
          <GitHubIcon />
          <Link href='https://https://github.com/dschilmoeller' target='_blank'>
            Github
          </Link>
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={3} />
        <Grid item xs={6} display={'flex'}>
          <EmailIcon />
          <Link href='mailto: dave.schilmoeller@gmail.com'>
            Gmail
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutPage;
