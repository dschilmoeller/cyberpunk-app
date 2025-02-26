import React from 'react';
import Grid from '@mui/material/Grid';
import Item from '../Item';
import { Button } from '@mui/material';
import { inPlayUseGrenade } from '../../../../services/CharInPlay.services';
import WeaponDialog from '../../../Modals/WeaponDialog';

export default function WeaponsGrenades({ charDetail, charGrenades, setCharGrenades, loading, setLoading, setPageAlert }) {
  const useGrenade = async (grenade) => {
    setLoading(true);
    const grenadeObj = {
      grenade_bridge_id: grenade.grenade_bridge_id,
      qty_owned: grenade.qty_owned - 1,
    };
    try {
      let result = await inPlayUseGrenade(grenadeObj);
      if (result === 'OK') {
        setPageAlert({ open: true, message: 'KABOOM', severity: 'error' });
        setCharGrenades(
          charGrenades.map((nade) => {
            if (nade.grenade_bridge_id === grenade.grenade_bridge_id) {
              return { ...nade, qty_owned: nade.qty_owned - 1 };
            } else {
              return nade;
            }
          })
        );
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } catch (error) {
      console.error('Error using grenade:', error);
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  const grenadeRange = (charDetail.strength + charDetail.cyber_strength) * 5;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Item>Grenades - You can throw one of these hot potatoes a cool {grenadeRange} meters</Item>
        </Grid>
        {charGrenades.map((grenade) => {
          if (grenade.qty_owned > 0) {
            return (
              <React.Fragment key={grenade.grenade_bridge_id}>
                <Grid item xs={4} padding={1}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Item>
                        <WeaponDialog prop={grenade.name} />
                      </Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Item>
                        <b>Quantity: {grenade.qty_owned}</b>
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
          }
        })}
      </Grid>
    </>
  );
}
