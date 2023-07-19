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

// TODO:
// figure out how to handle dual wielding.
// Should be able to manage via IDs and counting the equipped weapons .length.
// or just not worry about it - this is basically a matter of what shows up on the character sheet, not what is in the char's hands.
// so just go by bridge and owned gear table IDs to add / remove. Probably a better method for armor reducer handling as well. 
// collapse owned and equipped gear into one table with simple equipped T/F column. Only apply info if equipped = true.

export default function AdvancementGearWeapons() {
    const dispatch = useDispatch();
    const characterWeapons = useSelector(store => store.advancementGear.weapons)

    const unequipWeapon = (incomingWeapon) => {
        dispatch({ type: "UNEQUIP_WEAPON", payload: incomingWeapon })
    }

    const equipWeapon = (incomingWeapon) => {
        dispatch({ type: "EQUIP_WEAPON", payload: incomingWeapon })
    }

    return (<>
        <h1>Weapons!</h1>
        <h1>Equipped Weapons</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
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
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `Str + ${item.damage}` : `${item.damage}`}</TableCell>
                                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center"><Button onClick={() => unequipWeapon(item)}>Unequip</Button></TableCell>
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
                    <TableRow>
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
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `Str + ${item.damage}` : `${item.damage}`}</TableCell>
                                    <TableCell align="center">{item.dmg_type === 'bow' ? `Str * ${item.range}` : `${item.range}`}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center"><Button onClick={() => equipWeapon(item)}>Equip</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}