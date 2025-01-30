import React from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material/';

import WeaponDialog from '../../Modals/WeaponDialog';
import { updateWeaponStatusRequest } from '../../../services/equip.services';

// TODO: Modding to be enabled. Eventually.
export default function AdvancementGearWeapons({
  equipCharDetails,
  charGear,
  setCharGear,
  loading,
  setLoading,
  // setPageAlert,
  chuckError,
}) {
  const changeWeaponStatus = async (incomingWeapon) => {
    setLoading(true);
    const weaponObj = {
      weapon_bridge_id: incomingWeapon.weapon_bridge_id,
      equipped: !incomingWeapon.equipped,
    };

    try {
      let result = await updateWeaponStatusRequest(weaponObj);
      if (result === 'OK') {
        let updatedWeapons = [];
        for (let i = 0; i < charGear.weapons.length; i++) {
          if (charGear.weapons[i].weapon_bridge_id === incomingWeapon.weapon_bridge_id) {
            updatedWeapons.push({ ...charGear.weapons[i], equipped: !incomingWeapon.equipped });
          } else {
            updatedWeapons.push(charGear.weapons[i]);
          }
        }
        setCharGear({
          ...charGear,
          weapons: updatedWeapons,
        });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error changing weapon equip status:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Equipped Weapons</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Damage</TableCell>
              <TableCell align="center">Range</TableCell>
              <TableCell align="center">Rate of Fire</TableCell>
              <TableCell align="center">Max Clip</TableCell>
              <TableCell align="center"># of Hands</TableCell>
              <TableCell align="center">Concealable?</TableCell>
              <TableCell align="center">Unequip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.weapons.map((item, i) => {
              if (item.equipped === true) {
                return (
                  <TableRow hover key={i}>
                    <TableCell align="left">
                      <WeaponDialog prop={item.name} />
                    </TableCell>
                    <TableCell align="center">
                      {item.dmg_type === 'melee' || item.dmg_type === 'bow'
                        ? `${equipCharDetails.strength + equipCharDetails.cyber_strength + item.damage}`
                        : `${item.damage}`}
                    </TableCell>
                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                    <TableCell align="center">{item.rof}</TableCell>
                    <TableCell align="center">{item.max_clip}</TableCell>
                    <TableCell align="center">{item.hands}</TableCell>
                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" disabled={loading} color="secondary" onClick={() => changeWeaponStatus(item)}>
                        Unequip
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>Owned Weapons</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Damage</TableCell>
              <TableCell align="center">Range</TableCell>
              <TableCell align="center">Rate of Fire</TableCell>
              <TableCell align="center">Max Clip</TableCell>
              <TableCell align="center"># of Hands</TableCell>
              <TableCell align="center">Concealable?</TableCell>
              <TableCell align="center">Equip</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.weapons.map((item, i) => {
              if (item.equipped === false) {
                return (
                  <TableRow hover key={i}>
                    <TableCell align="left">
                      <WeaponDialog prop={item.name} />
                    </TableCell>
                    <TableCell align="center">
                      {item.dmg_type === 'melee' || item.dmg_type === 'bow'
                        ? `${equipCharDetails.strength + equipCharDetails.cyber_strength + item.damage}`
                        : `${item.damage}`}
                    </TableCell>
                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                    <TableCell align="center">{item.rof}</TableCell>
                    <TableCell align="center">{item.max_clip}</TableCell>
                    <TableCell align="center">{item.hands}</TableCell>
                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" disabled={loading} color="info" onClick={() => changeWeaponStatus(item)}>
                        Equip
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>Grenades</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Qty Owned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.grenades.map((nade, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="left">{nade.name}</TableCell>
                  <TableCell align="center">{nade.description}</TableCell>
                  <TableCell align="center">{nade.qty_owned}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
