// Gear purchased first with separate pool of money
// Currently to include armor [no mods], weapons [no mods], and misc. gear [make table]
// Need to figure out drop downs before mods will make sense. Also fancy ammo.
// Grenades table?
// Show character gear at top of page
// can show armor all in one.

import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

export default function CreationGear() {
    const dispatch = useDispatch();

    const armor = useSelector(store => store.armorMaster)
    const weapons = useSelector(store => store.weaponMaster)
    const charArmor = useSelector(store => store.characterCreation.armor)

    const [selectedList, setSelectedList] = useState('Armor')
    const [bank, setBank] = useState(2500)

    const armorRows = []
    const armorBuilder = () => {
        const createArmorData = (name, quality, description, price, armor_master_id) => {
            return { name, quality, description, price, armor_master_id };
        }
        for (let i = 0; i < armor.length; i++) {
            armorRows.push(createArmorData(armor[i].name, armor[i].quality, armor[i].description, armor[i].price, armor[i].armor_master_id))
        }
    }

    const weaponRows = []
    const weaponBuilder = () => {
        const createWeaponData = (name, damage, dmg_type, range, rof, max_clip, hands, concealable, price, weapon_master_id) => {
            return { name, damage, dmg_type, range, rof, max_clip, hands, concealable, price, weapon_master_id }
        }
        for (let i = 0; i < weapons.length; i++) {
            weaponRows.push(createWeaponData(weapons[i].name, weapons[i].damage, weapons[i].dmg_type, weapons[i].range,
                weapons[i].rof, weapons[i].max_clip, weapons[i].hands, weapons[i].concealable, weapons[i].price, weapons[i].weapon_master_id))
        }
    }

    armorBuilder();
    weaponBuilder();

    const purchaseArmor = (price, armor_master_id) => {
        if (bank > price) {
            setBank(bank - price)
            dispatch({ type: "CREATION_BUY_ARMOR", payload: armor_master_id })
        } else {
            alert("Insufficient funds")
        }
    }
    return (<>
        <h2>Cash on Hand: ${bank}</h2>
        <h3>My armor:</h3>
        <ul>
        {charArmor.map((item, i) => {
            console.log(`Item:`, item);
            return (<> 
            <li>{}</li>
            </>)
        })}
        </ul>

        <Button onClick={() => setSelectedList('Armor')}>Armor</Button>
        <Button onClick={() => setSelectedList('Weapons')}>Weapons</Button>

        {selectedList === 'Armor' ? (<>
            <h1>Armor</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Purchase?</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Quality</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {armorRows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left"><Button onClick={() => purchaseArmor(row.price, row.armor_master_id)}>Purchase</Button></TableCell>
                                <TableCell>{row.name} </TableCell>
                                <TableCell align="left">{row.quality}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="right">{row.price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}


        {selectedList === 'Weapons' ? (<>
            <h1>Weapons</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Purchase?</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="center">Damage</TableCell>
                            <TableCell align="center">Range</TableCell>
                            <TableCell align="center">Rate of Fire</TableCell>
                            <TableCell align="center">Max Clip</TableCell>
                            <TableCell align="center"># of Hands</TableCell>
                            <TableCell align="center">Concealable?</TableCell>
                            <TableCell align="center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weaponRows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="left"><Button>Purchase</Button></TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">{row.dmg_type === 'melee' || row.dmg_type === 'bow' ? `Str + ${row.damage}` : `${row.damage}`}</TableCell>
                                <TableCell align="center">{row.dmg_type === 'bow' ? `Str * ${row.range}` : `${row.range}`}</TableCell>
                                <TableCell align="center">{row.rof}</TableCell>
                                <TableCell align="center">{row.max_clip}</TableCell>
                                <TableCell align="center">{row.hands}</TableCell>
                                <TableCell align="center">{row.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="right">{row.price}$</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>) : <></>}

    </>)
}