import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

import WeaponDialog from '../../Modals/WeaponDialog';

export default function AdvancementGearWeapons() {
    const dispatch = useDispatch();
    const characterWeapons = useSelector(store => store.advancementGear.weapons)
    const charDetail = useSelector(store => store.advancementDetail)
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const equipWeapon = (incomingWeapon) => {
        // dispatch({ type: "EQUIP_WEAPON", payload: { weapon: incomingWeapon, charID: charDetail.id } })
        dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingWeapon, charID: charDetail.id, table: 'char_weapons_bridge', tablePrimaryKey: 'weapon_bridge_id', tableID: incomingWeapon.weapon_bridge_id, equipStatus: true } });
    }

    const unequipWeapon = (incomingWeapon) => {
        dispatch({ type: "CHANGE_GEAR_EQUIP_STATUS", payload: { item: incomingWeapon, charID: charDetail.id, table: 'char_weapons_bridge', tablePrimaryKey: 'weapon_bridge_id', tableID: incomingWeapon.weapon_bridge_id, equipStatus: false } });
    }

    return (<>
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
                    {characterWeapons.map((item, i) => {
                        if (item.equipped === true) {
                            return (
                                <TableRow hover key={i}>
                                    <TableCell align="left"><WeaponDialog prop={item.name} /></TableCell>
                                    <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `${charDetail.strength + charDetail.cyber_strength + item.damage}` : `${item.damage}`}</TableCell>
                                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='secondary' onClick={() => unequipWeapon(item)}>Unequip</Button></TableCell>
                                </TableRow>
                            )
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
                    {characterWeapons.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <TableRow hover key={i}>
                                    <TableCell align="left"><WeaponDialog prop={item.name} /></TableCell>
                                    <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `${charDetail.strength + charDetail.cyber_strength + item.damage}` : `${item.damage}`}</TableCell>
                                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='info' onClick={() => equipWeapon(item)}>Equip</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}