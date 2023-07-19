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
    const ownedArmor = useSelector(store => store.advancementGear.ownedArmor)
    const ownedShield = useSelector(store => store.advancementGear.ownedShield)
    const equippedArmor = useSelector(store => store.advancementGear.equippedArmor)
    const equippedShield = useSelector(store => store.advancementGear.equippedShield)
    const armor = useSelector(store => store.armorMaster)
    const shield = useSelector(store => store.shieldMaster)

    const armorRows = []
    const armorBuilder = () => {
        const createArmorData = (name, quality, description, price, armor_master_id) => {
            return { name, quality, description, price, armor_master_id };
        }
        for (let i = 0; i < ownedArmor.length; i++) {
            armorRows.push(createArmorData(armor[i].name, armor[i].quality, armor[i].description, armor[i].price, armor[i].armor_master_id))
        }
    }

    armorBuilder();

    const armorQualityBuilder = () => {
        let armorTotal = (
            equippedArmor[0].quality + equippedShield[0].quality
        )
        
        return armorTotal
    }

    const changeEquippedArmor = (incomingArmor) => {
            dispatch({ type: 'CHANGE_EQUIPPED_ARMOR', payload: armor[incomingArmor.armor_master_id - 1] })
    }
    const changeEquippedShield = (incomingShield) => {
        dispatch({ type: 'CHANGE_EQUIPPED_SHIELD', payload: shield[incomingShield.shield_master_id - 1] })
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {equippedArmor.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                </TableRow>
                            )
                        
                    })}
                    {equippedShield.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                </TableRow>
                            )
                        
                    })}
                </TableBody>
            </Table>
        </TableContainer>

        <h1>Owned Armor</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Equip?</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Quality</TableCell>
                        <TableCell align="left">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ownedArmor.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left"><Button onClick={() => changeEquippedArmor(item)}>Equip</Button></TableCell>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                </TableRow>
                            )
                        }
                    })}
                    {ownedShield.map((item, i) => {
                        if (item.equipped === false) {
                            return (
                                <TableRow key={i}>
                                    <TableCell align="left"><Button onClick={() => changeEquippedShield(item)}>Equip</Button></TableCell>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="left">{item.quality}</TableCell>
                                    <TableCell align="left">{item.description}</TableCell>
                                </TableRow>
                            )
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}