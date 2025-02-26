import React from 'react';
import Item from '../Item';
import { Grid, Typography, Button } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import OtherAttributesDialog from '../../../Modals/OtherAttributesDialog';
import WeaponDialog from '../../../Modals/WeaponDialog';
import CharWeaponDieRollDialog from '../../../Modals/CharWeaponDieRoll';
import { inPlayWeaponChangeRequest } from '../../../../services/CharInPlay.services';

export default function WeaponCard({ prop, charDetail, charStatus, loading, setLoading, clip, painEditor, setPageAlert }) {
  const unhurtMarker = <CircleOutlinedIcon />;
  const aggMarker = <CancelIcon />;

  const [thisWeaponShotsFired, setThisWeaponShotsFired] = React.useState(prop.current_shots_fired);

  let damage = undefined;
  let hands = undefined;
  let concealable = false;
  let rof = 2;
  switch (prop.name) {
    case 'Cybersnake':
      damage = charDetail.strength + charDetail.cyber_strength + 2;
      hands = 0;
      concealable = true;
      break;
    case 'Vampyres':
      damage = charDetail.strength + charDetail.cyber_strength + 0;
      hands = 0;
      concealable = true;
      break;
    case 'Big Knucks':
      damage = charDetail.strength + charDetail.cyber_strength + 1;
      hands = 0;
      concealable = true;
      break;
    case 'Scratchers':
      damage = charDetail.strength + charDetail.cyber_strength + 0;
      hands = 1;
      concealable = true;
      break;
    case 'Rippers':
      damage = charDetail.strength + charDetail.cyber_strength + 1;
      hands = 1;
      concealable = true;
      break;
    case 'Wolvers':
      damage = charDetail.strength + charDetail.cyber_strength + 2;
      hands = 1;
      concealable = true;
      break;
    default:
      break;
  }

  const weaponHandCalculation = (incoming) => {
    if (incoming.dmg_type === 'melee') {
      if (charDetail.strength + charDetail.cyber_strength > 8) {
        return 1;
      } else {
        return incoming.hands;
      }
    } else {
      return incoming.hands;
    }
  };

  const weaponDamageCalculation = (incoming) => {
    if (incoming.dmg_type === 'melee') {
      return incoming.damage + charDetail.strength + charDetail.cyber_strength;
    } else {
      return incoming.damage;
    }
  };

  const weaponRangeCalculation = (incoming) => {
    if (incoming.dmg_type === 'bow') {
      return incoming.range * (charDetail.strength + charDetail.cyber_strength);
    } else {
      return incoming.range;
    }
  };

  const handleReload = async (weaponData) => {
    setLoading(true);
    const weaponObj = {
      current_shots_fired: 0,
      weapon_bridge_id: weaponData.weapon_bridge_id,
    };
    try {
      let result = await inPlayWeaponChangeRequest(weaponObj);
      if (result === 'OK') {
        setThisWeaponShotsFired(0);
      }
    } catch (error) {
      console.error('Error reloading weapon', error);
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  const handleOneShot = async (weaponData) => {
    setLoading(true);
    const weaponObj = {
      current_shots_fired: thisWeaponShotsFired + 1,
      weapon_bridge_id: weaponData.weapon_bridge_id,
    };
    if (thisWeaponShotsFired + 1 <= weaponData.max_clip) {
      try {
        let result = await inPlayWeaponChangeRequest(weaponObj);
        if (result === 'OK') {
          setThisWeaponShotsFired(thisWeaponShotsFired + 1);
        }
      } catch (error) {
        console.error('Error firing weapon', error);
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else {
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  const handleAutoFire = async (weaponData) => {
    setLoading(true);
    const weaponObj = {
      current_shots_fired: thisWeaponShotsFired + 10,
      weapon_bridge_id: weaponData.weapon_bridge_id,
    };
    if (thisWeaponShotsFired + 10 <= weaponData.max_clip) {
      try {
        let result = await inPlayWeaponChangeRequest(weaponObj);
        if (result === 'OK') {
          setThisWeaponShotsFired(thisWeaponShotsFired + 10);
        }
      } catch (error) {
        console.error('Error reloading weapon', error);
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else {
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  const ClipButtonBuilder = (weaponData) => {
    return (
      <Grid item xs={12}>
        <Item>
          <Typography>
            Clip:
            <Button sx={{ margin: 1 }} variant="outlined" disabled={loading} onClick={() => handleOneShot(weaponData)}>
              Shoot
            </Button>
            {weaponData.dmg_type === 'smg' || weaponData.dmg_type === 'assault' ? (
              <Button sx={{ margin: 1 }} variant="outlined" disabled={loading} onClick={() => handleAutoFire(weaponData)}>
                AutoFire
              </Button>
            ) : (
              <></>
            )}
            <Button sx={{ margin: 1 }} variant="outlined" disabled={loading} onClick={() => handleReload(weaponData)}>
              Reload
            </Button>
          </Typography>
        </Item>
      </Grid>
    );
  };

  const clipBuilder = () => {
    let clipArray = [];
    // starts by adding a checked box to the array
    for (let i = 0; i < thisWeaponShotsFired; i++) {
      // key is good until something with more than 100 bullets in the clip comes along
      clipArray.push(
        <Grid item key={i + 100} xs={1.2}>
          <Item>{aggMarker}</Item>
        </Grid>
      );
    }
    // next adds blank boxes to the array to the end of the list.
    if (clipArray.length < prop.max_clip) {
      let remainder = prop.max_clip - thisWeaponShotsFired;
      for (let i = 0; i < remainder; i++) {
        clipArray.push(
          <Grid item key={i + 200} xs={1.2}>
            <Item>{unhurtMarker}</Item>
          </Grid>
        );
      }
    }
    return clipArray;
  };

  return (
    <React.Fragment>
      <Grid item xs={6}>
        <Grid container>
          <Grid item xs={6}>
            <Item>
              <b>Name</b>
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <OtherAttributesDialog prop={'DMG'} />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <OtherAttributesDialog prop={'ROF'} />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <OtherAttributesDialog prop={'Range'} />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <WeaponDialog prop={prop.name} />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{damage === undefined ? weaponDamageCalculation(prop) : damage}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{prop.rof ? prop.rof : rof}</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>{prop.range > 0 ? weaponRangeCalculation(prop) : 'Melee'}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CharWeaponDieRollDialog type={'exotic'} charDetail={charDetail} charStatus={charStatus} painEditor={painEditor} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Concealable: {concealable === false ? (prop.concealable ? 'Yes' : 'No') : 'Yes'}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Number of Hands: {hands === undefined ? weaponHandCalculation(prop) : hands}</Item>
          </Grid>
        </Grid>
        {clip === true ? ClipButtonBuilder(prop) : <></>}
        <Grid container justifyContent={'center'}>
          {clip === true ? clipBuilder(prop.max_clip, prop.current_shots_fired) : <></>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
