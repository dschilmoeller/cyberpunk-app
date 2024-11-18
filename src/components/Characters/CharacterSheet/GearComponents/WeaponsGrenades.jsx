import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '../Item';
import { Button } from '@mui/material';
import { inPlayUseGrenade } from '../character.services';
import WeaponDialog from '../../../Modals/WeaponDialog';

export default function WeaponsGrenades({ charDetail, charGrenades, setCharGrenades, loading, setLoading, chuckError, setPageAlert }) {
  const useGrenade = async (grenade) => {
    setLoading(true);
    const grenadeObj = {
      grenade_bridge_id: grenade.grenade_bridge_id,
    };
    try {
      let result = await inPlayUseGrenade(grenadeObj);
      if (result === 'OK') {
        setPageAlert({ open: true, message: 'KABOOM', severity: 'error' });
        setCharGrenades(charGrenades.filter((e) => e.grenade_bridge_id != grenade.grenade_bridge_id));
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error using grenade:', error);
      chuckError();
    }
    setLoading(false);
  };

  const grenadeRange = (charDetail.strength + charDetail.cyber_strength) * 5;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Item>Grenades</Item>
        </Grid>
        {charGrenades.map((grenade) => {
          return (
            <React.Fragment key={grenade.grenade_bridge_id}>
              <Grid item xs={4} padding={1}>
                <Grid container>
                  <Grid item xs={6}>
                    <Item>
                      <b>Name</b>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <b>Range: {grenadeRange}</b>
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <WeaponDialog prop={grenade.name} />
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item>
                      <Button disabled={loading} onClick={() => useGrenade(grenade)}>
                        Use
                      </Button>
                    </Item>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </>
  );
}
