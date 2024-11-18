import React from 'react';
import { Grid } from '@mui/material';

import Item from '../Item';
import { fetchCharWeaponsRequest, fetchCharGrenadesRequest } from '../character.services';

import WeaponCard from './WeaponCard';
import WeaponsGrenades from './WeaponsGrenades';

import CharacterSheetHeaderDialog from '../Modals/CharacterSheetHeaderDialog';

function Weapons({ charDetail, charStatus, charCyberware, loading, setLoading, chuckError, setPageAlert, painEditor }) {
  const [charWeapons, setCharWeapons] = React.useState([]);
  const [charGrenades, setCharGrenades] = React.useState([]);

  const fetchCharWeapons = async () => {
    setLoading(true);
    const weaponObj = {
      charID: charDetail.id,
    };
    try {
      let result = await fetchCharWeaponsRequest(weaponObj);
      setCharWeapons(result);
      let grenades = await fetchCharGrenadesRequest(weaponObj);
      setCharGrenades(grenades);
    } catch (error) {
      console.error('Error fetching character weapons:', error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchCharWeapons();
  }, []);

  const isCyberWeapon = (cyberware) => {
    switch (cyberware.name) {
      case 'Cybersnake':
      case 'Vampyres':
      case 'Big Knucks':
      case 'Scratchers':
      case 'Rippers':
      case 'Wolvers':
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={2}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Weapons'} />
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* cycle through weapons and list melee weapons up top, starting with melee cyberweapons - ranged are handled like a regular firearm. */}
        {charCyberware.map((cyberware) => {
          if (cyberware.equipped === true && isCyberWeapon(cyberware)) {
            return (
              <WeaponCard
                prop={cyberware}
                charDetail={charDetail}
                charStatus={charStatus}
                key={cyberware.owned_cyberware_id}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
                setPageAlert={setPageAlert}
                painEditor={painEditor}
              />
            );
          }
        })}
        {charWeapons.map((weapon) => {
          if (weapon.equipped === true && weapon.dmg_type === 'melee') {
            return (
              <WeaponCard
                prop={weapon}
                charDetail={charDetail}
                charStatus={charStatus}
                key={weapon.weapon_bridge_id}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
                setPageAlert={setPageAlert}
                painEditor={painEditor}
              />
            );
          }
        })}
        {charWeapons.map((weapon) => {
          if (weapon.equipped === true && weapon.dmg_type != 'melee') {
            return (
              <WeaponCard
                prop={weapon}
                charDetail={charDetail}
                charStatus={charStatus}
                key={weapon.weapon_bridge_id}
                loading={loading}
                setLoading={setLoading}
                clip={true}
                chuckError={chuckError}
                setPageAlert={setPageAlert}
                painEditor={painEditor}
              />
            );
          }
        })}

        <Grid item xs={12}>
          <WeaponsGrenades
            charDetail={charDetail}
            charGrenades={charGrenades}
            setCharGrenades={setCharGrenades}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
            setPageAlert={setPageAlert}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Weapons;
