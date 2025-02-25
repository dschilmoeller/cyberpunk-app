import React from 'react';
import WeaponDialog from '../../../Modals/WeaponDialog';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest } from '../../../../services/shopping.services';
import { updateWeaponStatusRequest } from '../../../../services/equip.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';

export default function WeaponsOwnedTable({ charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const sellWeapon = async (item) => {
    setLoading(true);
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Weapon',
      gearID: item.weapon_bridge_id,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      let sellResult = await charSellGearRequest(itemObj);
      if (bankResult === 'OK' && sellResult === 'OK') {
        setCharGear({ ...charGear, weapons: charGear.weapons.filter((e) => e.armor_bridge_id != item.armor_bridge_id) });
        setCharDetail({ ...charDetail, bank: newBank });
        setPageAlert({ open: true, message: 'Weapon Sold!', severity: 'success' });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error selling weapon:', error);
      setPageAlert({ open: true, message: 'Error selling weapons!', severity: 'error' });
    }
    setLoading(false);
  };

  const changeWeaponEquip = async (incomingWeapon) => {
    setLoading(true);
    const weapons = charGear.weapons;
    for (let i = 0; i < weapons.length; i++) {
      // find the weapon being changed.
      if (weapons[i].armor_bridge_id === incomingWeapon.armor_bridge_id) {
        const weaponObj = {
          // flip status
          equipped: !weapons[i].equipped === true,
          weapon_bridge_id: weapons[i].weapon_bridge_id,
        };
        try {
          const result = await updateWeaponStatusRequest(weaponObj);
          if (result === 'OK') {
            setCharGear({
              ...charGear,
              weapons: charGear.weapons.map((e) => (e.weapon_bridge_id === incomingWeapon.weapon_bridge_id ? { ...e, equipped: !e.equipped } : e)),
            });
          }
        } catch (error) {
          console.error('Error changing weapon equip status:', error);
          chuckError();
        }
      }
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('equipped');

  function createCharWeaponData(
    char_id,
    concealable,
    current_shots_fired,
    damage,
    dmg_type,
    equipped,
    hands,
    max_clip,
    name,
    price,
    range,
    rof,
    weapon_bridge_id,
    weapon_id,
    weapon_master_id
  ) {
    return {
      char_id,
      concealable,
      current_shots_fired,
      damage,
      dmg_type,
      equipped,
      hands,
      max_clip,
      name,
      price,
      range,
      rof,
      weapon_bridge_id,
      weapon_id,
      weapon_master_id,
    };
  }

  const charWeaponRows = [];
  for (let i = 0; i < charGear.weapons.length; i++) {
    let damage = 0;
    let range = 0;

    if (charGear.weapons[i].dmg_type === 'melee' || charGear.weapons[i].dmg_type === 'bow') {
      damage = charDetail.strength + charDetail.cyber_strength + charGear.weapons[i].damage;
    } else {
      damage = charGear.weapons[i].damage;
    }

    if (charGear.weapons[i].dmg_type === 'bow') {
      range = (charDetail.strength + charDetail.cyber_strength) * charGear.weapons[i].range;
    } else {
      range = charGear.weapons[i].range;
    }

    charWeaponRows.push(
      createCharWeaponData(
        charGear.weapons[i].char_id,
        charGear.weapons[i].concealable,
        charGear.weapons[i].current_shots_fired,
        damage,
        charGear.weapons[i].dmg_type,
        charGear.weapons[i].equipped,
        charGear.weapons[i].hands,
        charGear.weapons[i].max_clip,
        charGear.weapons[i].name,
        charGear.weapons[i].price,
        range,
        charGear.weapons[i].rof,
        charGear.weapons[i].weapon_bridge_id,
        charGear.weapons[i].weapon_id,
        charGear.weapons[i].weapon_master_id
      )
    );
  }

  // sort and monitor changes to charWeaponRows in case of sales.
  const sortedCharWeaponRows = React.useMemo(() => stableSort(charWeaponRows, getComparator(order, orderBy)), [order, orderBy, charWeaponRows]);

  return (
    <>
      <h2>My Weapons</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'damage', 'range', 'rof', 'max_clip', 'hands', 'concealable', 'price'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharWeaponRows.map((row) => {
                  return (
                    <React.Fragment key={row.weapon_bridge_id}>
                      <TableRow hover>
                        <TableCell>
                          <WeaponDialog prop={row.name} />
                        </TableCell>
                        <TableCell align="center">{row.damage}</TableCell>
                        <TableCell align="center">{row.range}</TableCell>
                        <TableCell align="center">{row.rof}</TableCell>
                        <TableCell align="center">{row.max_clip}</TableCell>
                        <TableCell align="center">{row.hands}</TableCell>
                        <TableCell align="center">{row.concealable === true ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="center">{moneyMaker(Math.floor(row.price / 4))}</TableCell>
                      </TableRow>
                      {row.equipped === true ? (
                        <>
                          <TableRow hover>
                            <TableCell colSpan={3} align="center">
                              {row.name} is Equipped!
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button variant={'contained'} disabled={loading} color="secondary" onClick={() => changeWeaponEquip(row)}>
                                Unequip
                              </Button>
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button variant={'contained'} disabled={loading} color="error" onClick={() => sellWeapon(row)}>
                                Sell
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow hover>
                            <TableCell colSpan={3} align="center">
                              {row.name} is NOT Equipped!
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button variant={'contained'} disabled={loading} color="info" onClick={() => changeWeaponEquip(row)}>
                                Equip
                              </Button>
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button variant={'contained'} disabled={loading} color="error" onClick={() => sellWeapon(row)}>
                                Sell
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
