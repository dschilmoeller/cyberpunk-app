import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../CharacterSheet/Item';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

export default function AdvancementGearArmor() {
    const dispatch = useDispatch();
    const characterArmor = useSelector(store => store.advancementGear.armor)
    const characterShield = useSelector(store => store.advancementGear.shield)

    const armorRows = []

    const armorQualityBuilder = () => {
        let armorTotal = 0
        characterArmor.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
            }
        })
        characterShield.map(item => {
            if (item.equipped === true) {
                armorTotal += item.quality
            }
        })

        return armorTotal
    }

    const equipArmor = (incomingArmor) => {
        dispatch({ type: 'EQUIP_ARMOR', payload: incomingArmor })
    }
    const equipShield = (incomingShield) => {
        dispatch({ type: 'EQUIP_SHIELD', payload: incomingShield })
    }

    const unequipArmor = (incomingArmor) => {
        dispatch({ type: 'UNEQUIP_ARMOR', payload: incomingArmor })
    }
    const unequipShield = (incomingShield) => {
        dispatch({ type: 'UNEQUIP_SHIELD', payload: incomingShield })
    }

    return (<>

        <Grid container>
            <Grid item xs={12}><Item><h2>Current Armor Level: {armorQualityBuilder()}</h2></Item></Grid>
        </Grid>

        <h1>Equipped Armor</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Quality</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Unequip</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characterArmor.map((item, i) => {
                        if (item.equipped === true) {
                        return (
                            <TableRow key={i}>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="left">{item.quality}</TableCell>
                                <TableCell width={600} align="left">{item.description}</TableCell>
                                <TableCell align="left"><Button onClick={()=> unequipArmor(item)}>Unequip</Button></TableCell>
                            </TableRow>
                        )
                    }
                    })}
                    {characterShield.map((item, i) => {
                        if (item.equipped === true) {
                        return (
                            <TableRow key={i}>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="left">{item.quality}</TableCell>
                                <TableCell width={600} align="left">{item.description}</TableCell>
                                <TableCell align="left"><Button onClick={()=> unequipShield(item)}>Unequip</Button></TableCell>
                            </TableRow>
                        )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1>Owned Armor</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Quality</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="left">Equip?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characterArmor.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell width={600} align="left">{item.description}</TableCell>
                                    <TableCell align="left"><Button onClick={() => equipArmor(item)}>Equip</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                    {characterShield.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell width={600} align="left">{item.description}</TableCell>
                                    <TableCell align="left"><Button onClick={() => equipShield(item)}>Equip</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}