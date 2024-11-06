import * as React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Grid } from '@mui/material';

export default function WeaponDialog({ prop }) {
  const weaponMaster = useSelector((store) => store.gearMaster.weapons);
  const cyberwareMaster = useSelector((store) => store.gearMaster.cyberware);
  const grenadeMaster = useSelector((store) => store.gearMaster.grenades);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const titleText = (prop) => {
    switch (prop) {
      case 'DMG':
        return 'Damage';
      case 'ROF':
        return 'Rate of Fire';
      default:
        return prop;
    }
  };

  return (
    <>
      <Button
        sx={{
          lineHeight: 1,
          justifyContent: 'center',
          textTransform: 'none',
          color: 'white',
          '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
          },
        }}
        fullWidth
        onClick={handleClickOpen('paper')}
      >
        {prop}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{titleText(prop)}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {weaponMaster.map((item) => {
            if (item.name === prop) {
              return (
                <React.Fragment key={item.weapon_master_id}>
                  <Grid container fontFamily={'serif'}>
                    <Grid item padding={1} xs={12}>
                      {item.description}
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            }
          })}
          {cyberwareMaster.map((item) => {
            if (item.name === prop) {
              return (
                <React.Fragment key={item.cyberware_master_id}>
                  <Grid container fontFamily={'serif'}>
                    <Grid item padding={1} xs={12}>
                      {item.description}
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            }
          })}
          {grenadeMaster.map((item) => {
            if (item.name === prop) {
              return (
                <React.Fragment key={item.grenade_master_id}>
                  <Grid container fontFamily={'serif'}>
                    <Grid item padding={1} xs={12}>
                      {item.description}
                    </Grid>
                  </Grid>
                </React.Fragment>
              );
            }
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
